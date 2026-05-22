const CACHE_PREFIX = 'rv_msg_'

export async function generateMotivationalMessage({ greeting, totalTasks, completedTasks, objectives, progress }) {
  const today = new Date().toISOString().split('T')[0]
  const cacheKey = CACHE_PREFIX + today

  const cached = localStorage.getItem(cacheKey)
  if (cached) return cached

  const objectivesText = objectives.length > 0
    ? objectives.join(', ')
    : 'nenhum objetivo definido ainda'

  const prompt = `Você é um assistente motivacional pessoal para Lucas Cruz, empreendedor brasileiro.

Contexto:
- Saudação: ${greeting}
- Total de tarefas ativas: ${totalTasks}
- Tarefas concluídas hoje: ${completedTasks}
- Progresso: ${progress}%
- Objetivos principais: ${objectivesText}

Escreva uma mensagem motivacional CURTA (máximo 4 linhas) em português brasileiro. Tom: direto, inspirador, pessoal. Sem markdown, sem asteriscos. Comece com "${greeting}, Lucas!" seguido de emoji. Termine com emoji. Seja específico ao contexto.`

  try {
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    if (!response.ok) throw new Error('API unavailable')

    const data = await response.json()
    if (data.error) throw new Error(data.error)

    localStorage.setItem(cacheKey, data.message)
    return data.message
  } catch (err) {
    const fallback = getFallbackMessage(greeting, progress)
    return fallback
  }
}

function getFallbackMessage(greeting, progress) {
  const msgs = [
    `${greeting}, Lucas! 🌟\n\nCada tarefa concluída é um tijolo na construção do seu sucesso.\nMantena o foco e siga em frente! 💪`,
    `${greeting}, Lucas! 🚀\n\nA consistência diária supera qualquer talento.\nVocê está construindo algo incrível. Vamos nessa! ⚡`,
    `${greeting}, Lucas! 🎯\n\nProgresso de ${progress}% é conquista real.\nO trabalho de hoje planta os resultados de amanhã. Avante! 🔥`
  ]
  return msgs[new Date().getDate() % msgs.length]
}
