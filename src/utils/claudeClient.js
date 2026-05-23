import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Chamada genérica à Edge Function "call-claude"
export async function callClaude(message) {
  try {
    const { data, error } = await supabase.functions.invoke("call-claude", {
      body: { message },
    });

    if (error) {
      console.error("Erro ao chamar Claude:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Erro na chamada Claude:", error);
    throw error;
  }
}

// Extrai o texto da resposta (formato da Anthropic Messages API)
function extractText(data) {
  if (!data) return "";
  if (typeof data === "string") return data;
  if (Array.isArray(data.content)) {
    const bloco = data.content.find((b) => b && b.type === "text" && b.text);
    if (bloco) return String(bloco.text).trim();
  }
  if (typeof data.text === "string") return data.text.trim();
  return "";
}

// Gera a mensagem motivacional do dia (usada no Dashboard).
// Faz cache por dia no localStorage e, se a API falhar, devolve um fallback.
export async function generateMotivationalMessage({
  greeting,
  totalTasks,
  completedTasks,
  objectives,
  progress,
} = {}) {
  const hoje = new Date().toISOString().split("T")[0];
  const cacheKey = "rv_msg_" + hoje;

  // Reaproveita a mensagem já gerada hoje
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached;
  } catch (e) {
    /* localStorage indisponível — segue sem cache */
  }

  const objetivosTxt =
    Array.isArray(objectives) && objectives.length
      ? objectives
          .map((o) => (typeof o === "string" ? o : o?.titulo || o?.texto || ""))
          .filter(Boolean)
          .join("; ")
      : "nenhum objetivo definido";

  const prompt = `Você escreve UMA mensagem motivacional curta (1 a 2 frases, no máximo 240 caracteres) em português do Brasil, com tom direto e encorajador, sem clichês vazios e sem emojis.
Contexto do dia:
- Saudação: ${greeting || ""}
- Tarefas em aberto: ${totalTasks ?? 0}
- Tarefas concluídas: ${completedTasks ?? 0}
- Progresso do dia: ${progress ?? 0}%
- Objetivos: ${objetivosTxt}
Responda APENAS com a mensagem, sem aspas e sem introdução.`;

  const fallback = `${greeting || "Olá"}! Uma tarefa de cada vez — foco no essencial e o dia rende.`;

  try {
    const data = await callClaude(prompt);
    const msg = extractText(data) || fallback;
    try {
      localStorage.setItem(cacheKey, msg);
    } catch (e) {
      /* ignora falha de cache */
    }
    return msg;
  } catch (e) {
    return fallback;
  }
}

export { supabase };
