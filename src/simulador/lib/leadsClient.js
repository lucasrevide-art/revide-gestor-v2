import { supabase } from '../../utils/supabaseClient'

export async function criarLead({
  nicho,
  nivelConsciencia,
  respostas,
  pontuacao,
  nome,
  email,
  whatsapp,
}) {
  const { data, error } = await supabase
    .from('leads')
    .insert({
      nicho,
      nivel_consciencia: nivelConsciencia,
      respostas,
      score_clareza: pontuacao.scoreClareza,
      score_raiz: pontuacao.scoreRaiz,
      score_universo: pontuacao.scoreUniverso,
      score_zona_conversao: pontuacao.scoreZonaConversao,
      score_comunidade: pontuacao.scoreComunidade,
      gargalo_dominante: pontuacao.gargaloDominante,
      gargalo_secundario: pontuacao.gargaloSecundario,
      estagio_comunidade: pontuacao.estagioComunidade,
      nome,
      email,
      whatsapp,
      gate_preenchido_em: new Date().toISOString(),
      etapa_atual: 'resultado',
    })
    .select('id')
    .single()

  if (error) throw error
  return data.id
}

export async function registrarInteresse(leadId, { interesseDiagnostico, querCall }) {
  const { error } = await supabase
    .from('leads')
    .update({
      interesse_diagnostico: interesseDiagnostico,
      quer_call: querCall,
      etapa_atual: 'cta_final',
      concluido: true,
    })
    .eq('id', leadId)

  if (error) throw error
}
