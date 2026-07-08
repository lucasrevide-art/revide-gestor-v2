// Textos fixos do funil: hook, 3 sins, teaser, gate, apresentação do diagnóstico e CTAs (seções 7, 9, 10).

// TODO: substituir pelo link real de agendamento (Cal.com, Calendly, WhatsApp etc.) antes de publicar.
export const LINK_AGENDAMENTO = '#'

export const HOOK = {
  headline: 'O que trava sua marca pessoal não é falta de conteúdo. É a raiz que ainda não tomou forma.',
  subheadline: 'Responda 12 perguntas e descubra, com precisão, qual é o seu gargalo real — antes de publicar mais um post.',
  microcopy: 'Leva 2 minutos. Sem enrolação, sem pergunta genérica.',
  botao: 'Começar diagnóstico',
}

export const TRES_SINS = [
  'Pelas suas respostas, dá pra perceber um padrão: sua competência não é o problema. A forma como ela é percebida, é.',
  'Enquanto esse padrão não muda, cada nova oportunidade continua dependendo de você provar do zero — em vez da sua reputação fazer esse trabalho sozinha.',
  'Resolver isso significa parar de correr atrás de oportunidade e começar a ser procurado pelo motivo certo.',
]

export const TEASER = {
  intro: 'Baseado nas suas respostas, seu gargalo dominante é:',
  pergunta: 'Quer entender exatamente por quê, e o que fazer a partir disso?',
  botao: 'Quero meu diagnóstico completo',
}

export const GATE = {
  titulo: 'Quase lá.',
  subtitulo: 'Pra onde eu te envio o diagnóstico completo?',
  botao: 'Ver meu diagnóstico',
}

export const APRESENTACAO_DIAGNOSTICO = {
  texto:
    'O diagnóstico que você acabou de receber é um raio-x rápido. O **Diagnóstico Estratégico Cruz** vai além — é uma análise completa da sua marca, feita pra te dar direção real, não só um retrato.',
  entregaveis: [
    'Análise do seu perfil, bio e primeira impressão',
    'Análise de posicionamento — como sua marca é percebida hoje',
    'Análise de conteúdo — o que constrói percepção e o que só ocupa espaço',
    'Análise da sua oferta — se está clara o suficiente pra vender sozinha',
    'Leitura de concorrentes — onde existe espaço pra você se diferenciar',
    'Um plano de ação: o que ajustar primeiro, o que ajustar em 7 dias, o que ajustar em 30 dias',
  ],
  fechamento: 'Não é um mapeamento genérico. É a raiz do que você acabou de ver aqui, com profundidade.',
}

export const PERGUNTA_INTERESSE = {
  pergunta: 'Faria sentido pra você receber esse diagnóstico completo agora?',
  opcoes: [
    { valor: 'sim', label: 'Sim, com certeza' },
    { valor: 'talvez', label: 'Talvez, quero entender melhor antes' },
    { valor: 'nao_e_momento', label: 'Não é o momento' },
  ],
}

export const CTA_RAMIFICADO = {
  sim: {
    texto: 'Perfeito. O próximo passo é simples: 8 minutos, sem compromisso, pra eu entender seu contexto e te mostrar exatamente como o Diagnóstico Estratégico Cruz se aplica ao seu momento.',
    botao: 'Quero agendar',
    mostrarAgendar: true,
  },
  talvez: {
    texto: 'Faz sentido ter dúvida antes de decidir. Por isso a conversa de 8 minutos existe: não é uma venda, é pra você ver na prática se isso resolve o que você está sentindo — sem compromisso nenhum depois.',
    botao: 'Quero entender melhor',
    mostrarAgendar: true,
  },
  nao_e_momento: {
    texto: 'Sem problema. Seu diagnóstico já é seu — fica disponível quando fizer sentido. Se um dia quiser trocar uma ideia sobre isso, a porta continua aberta.',
    botao: 'Ver meu diagnóstico novamente',
    mostrarAgendar: false,
  },
}
