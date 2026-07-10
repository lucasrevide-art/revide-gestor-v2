import { supabase } from '../../utils/supabaseClient'

export async function criarLead({
  nicho,
  nivelConsciencia,
  respostas,
  pontuacao,
  nome,
  email,
  whatsapp,
  instagram,
}) {
  const id = crypto.randomUUID()

  const { error } = await supabase
    .from('leads')
    .insert({
      id,
      nicho,
      nivel_consciencia: nivelConsciencia,
      respostas,
      score_clareza: pontuacao.scoreClareza,
      score_raiz: pontuacao.scoreRaiz,
      score_universo: pontuacao.scoreUniverso,
      score_zona_conversao: pontuacao.scoreZonaConversao,
      score_comunidade: pontuacao.scoreComunidade,
      gargalo_dominante: pontuacao.gargaloDominante,
      nome,
      email,
      whatsapp,
      instagram: instagram || null,
      gate_preenchido_em: new Date().toISOString(),
      etapa_atual: 'resultado',
    })

  if (error) throw error
  return id
}

// A anon key não tem UPDATE direto na tabela `leads` (ver migration
// 20260709010000_enable_rls_leads.sql) — essa gravação passa pela Edge
// Function `registrar-interesse`, que roda com a service_role key e só
// aceita atualizar estes 4 campos, de um lead por vez.
export async function registrarInteresse(leadId, { interesseDiagnostico, querCall }) {
  const { error } = await supabase.functions.invoke('registrar-interesse', {
    body: { leadId, interesseDiagnostico, querCall },
  })

  if (error) throw error
}
