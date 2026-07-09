import { PERGUNTAS } from '../content/perguntas'

const EIXOS = ['clareza', 'raiz', 'universo', 'zona_conversao']

// respostas: { C1: 3, C2: 1, ... } — pontos brutos por pergunta (3, 1 ou 0)
export function calcularPontuacao(respostas) {
  const somaPorEixo = { clareza: 0, raiz: 0, universo: 0, zona_conversao: 0 }
  const temZeroPorEixo = { clareza: false, raiz: false, universo: false, zona_conversao: false }

  for (const pergunta of PERGUNTAS) {
    const pontos = respostas[pergunta.id] ?? 0
    somaPorEixo[pergunta.eixo] += pontos
    if (pontos === 0) temZeroPorEixo[pergunta.eixo] = true
  }

  const menorSoma = Math.min(...EIXOS.map(e => somaPorEixo[e]))
  const empatados = EIXOS.filter(e => somaPorEixo[e] === menorSoma)

  let gargaloDominante
  if (empatados.length > 1) {
    const comZero = empatados.filter(e => temZeroPorEixo[e])
    gargaloDominante = (comZero.length ? comZero : empatados)[0]
  } else {
    gargaloDominante = empatados[0]
  }

  return {
    scoreClareza: somaPorEixo.clareza,
    scoreRaiz: somaPorEixo.raiz,
    scoreUniverso: somaPorEixo.universo,
    scoreZonaConversao: somaPorEixo.zona_conversao,
    // Mesmas 3 perguntas do eixo Universo (U1, U2, U3); mantido só porque
    // a coluna score_comunidade já existe na tabela leads.
    scoreComunidade: somaPorEixo.universo,
    gargaloDominante,
  }
}
