// Chama o proxy local (server.js -> /api/claude) que fala com a Anthropic API.
// Requer ANTHROPIC_API_KEY no .env; se não configurada, cai no fallback abaixo.
export async function callClaude(prompt) {
  const res = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })
  if (!res.ok) throw new Error('Claude API error: ' + res.status)
  const data = await res.json()
  return data.message
}

// Gera a mensagem motivacional do dia (usada no Dashboard).
// Faz cache por dia no localStorage e, se a API falhar ou não estiver configurada, devolve um fallback.
export async function generateMotivationalMessage({
  greeting,
  totalTasks,
  completedTasks,
  objectives,
  progress,
} = {}) {
  const hoje = new Date().toISOString().split('T')[0]
  const cacheKey = 'rv_msg_' + hoje

  // Reaproveita a mensagem já gerada hoje
  try {
    const cached = localStorage.getItem(cacheKey)
    if (cached) return cached
  } catch (e) {
    /* localStorage indisponível — segue sem cache */
  }

  const objetivosTxt =
    Array.isArray(objectives) && objectives.length
      ? objectives
          .map((o) => (typeof o === 'string' ? o : o?.titulo || o?.texto || ''))
          .filter(Boolean)
          .join('; ')
      : 'nenhum objetivo definido'

  const prompt = `Você escreve UMA mensagem motivacional curta (1 a 2 frases, no máximo 240 caracteres) em português do Brasil, com tom direto e encorajador, sem clichês vazios e sem emojis.
Contexto do dia:
- Saudação: ${greeting || ''}
- Tarefas em aberto: ${totalTasks ?? 0}
- Tarefas concluídas: ${completedTasks ?? 0}
- Progresso do dia: ${progress ?? 0}%
- Objetivos: ${objetivosTxt}
Responda APENAS com a mensagem, sem aspas e sem introdução.`

  const fallback = `${greeting || 'Olá'}! Uma tarefa de cada vez — foco no essencial e o dia rende.`

  try {
    const msg = (await callClaude(prompt)) || fallback
    try {
      localStorage.setItem(cacheKey, msg)
    } catch (e) {
      /* ignora falha de cache */
    }
    return msg
  } catch (e) {
    return fallback
  }
}
