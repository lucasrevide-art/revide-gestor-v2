import { PERGUNTAS } from '../content/perguntas'

const EIXOS = ['clareza', 'raiz', 'universo', 'zona_conversao']

// respostas: { C1: 3, C2: 2, ... } — pontos brutos por pergunta
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

  const restantes = EIXOS.filter(e => e !== gargaloDominante)
  const segundaMenorSoma = Math.min(...restantes.map(e => somaPorEixo[e]))
  const empatadosSecundario = restantes.filter(e => somaPorEixo[e] === segundaMenorSoma)
  let gargaloSecundario
  if (empatadosSecundario.length > 1) {
    const comZero = empatadosSecundario.filter(e => temZeroPorEixo[e])
    gargaloSecundario = (comZero.length ? comZero : empatadosSecundario)[0]
  } else {
    gargaloSecundario = empatadosSecundario[0]
  }

  const scoreComunidade = somaPorEixo.universo
  let estagioComunidade
  if (scoreComunidade <= 3) estagioComunidade = 'dispersa'
  else if (scoreComunidade <= 6) estagioComunidade = 'interessada'
  else estagioComunidade = 'inicial'

  return {
    scoreClareza: somaPorEixo.clareza,
    scoreRaiz: somaPorEixo.raiz,
    scoreUniverso: somaPorEixo.universo,
    scoreZonaConversao: somaPorEixo.zona_conversao,
    scoreComunidade,
    gargaloDominante,
    gargaloSecundario,
    estagioComunidade,
  }
}
