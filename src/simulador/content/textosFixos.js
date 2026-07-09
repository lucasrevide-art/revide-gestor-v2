// Textos fixos do funil: hook, 3 sins, teaser, gate, apresentação do diagnóstico e CTAs (seções 7, 9, 10).

export const LINK_AGENDAMENTO = 'https://calendly.com/lucasrevide/new-meeting'

// Contatos diretos, exibidos só na tela final (CTAFinal), como alternativa
// discreta ao botão de agendamento.
export const CONTATOS = [
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send/?phone=5582998434048&text&type=phone_number&app_absent=0&utm_source=ig',
    icone: '💬',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lucas.ocruzz/',
    icone: '📷',
  },
]

export const HOOK = {
  headline: 'As pessoas não se conectam apenas com o que uma marca faz. Elas se conectam com o que ela defende, com o que combate e com a transformação que representa.',
  subheadline: 'O que impede sua marca pessoal de se destacar vai além do conteúdo.',
  microcopy: 'Em menos de 5 minutos, responda 12 perguntas e receba um diagnóstico claro, preciso e personalizado.',
  botao: 'Começar diagnóstico',
}

export const TRES_SINS = [
  'Pelas suas respostas, dá pra perceber um padrão: sua competência não é o problema. A forma como ela é percebida, é.',
  'Enquanto esse padrão não muda, cada nova oportunidade continua dependendo de você provar do zero, em vez da sua reputação fazer esse trabalho sozinha.',
  'Resolver isso significa parar de correr atrás de oportunidade e começar a ser procurado pelo motivo certo.',
]

export const TEASER = {
  introMetodo: 'No Método Cruz, toda marca pessoal se sustenta em 4 pilares: Clareza, Raiz, Universo e Zona de Conversão.',
  intro: 'Pelas suas respostas, o pilar que mais precisa da sua atenção agora é:',
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
    'O diagnóstico que você acabou de receber é um raio X rápido. O **Diagnóstico Estratégico Cruz** vai além, é uma análise completa da sua marca, feita pra te dar direção real, não só um retrato.',
  entregaveis: [
    'Mapas de conteúdo com sua narrativa e cliente ideal. Não só uma análise do que você já publica, mas um direcionamento de como usar sua narrativa pra guiar o que vem a seguir.',
    'Análise de posicionamento e percepção de valor. Quando seu posicionamento, visual ou estratégico, não está definido, seu preço não faz sentido pra ninguém: se estiver alto, as pessoas não compram porque não enxergam o valor; se estiver baixo, não compram porque não enxergam solução. Analisamos onde está esse descompasso.',
    'Mapeamento de concorrentes. Os que mais podem te impactar, na sua região ou no seu nicho online, o que eles fazem de certo, e a brecha que você pode ocupar pra se diferenciar.',
    'Plano de ação teórico e prático. Você sai sabendo exatamente o que ajustar nos próximos 7 dias, e a direção completa pros próximos 30.',
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
    texto: 'Faz sentido ter dúvida antes de decidir. Por isso a conversa de 8 minutos existe: não é uma venda, é pra você ver na prática se isso resolve o que você está sentindo, sem compromisso nenhum depois.',
    botao: 'Quero entender melhor',
    mostrarAgendar: true,
  },
  nao_e_momento: {
    texto: 'Sem problema. Seu diagnóstico já é seu, fica disponível quando fizer sentido. Se um dia quiser trocar uma ideia sobre isso, a porta continua aberta.',
    botao: 'Ver meu diagnóstico novamente',
    mostrarAgendar: false,
  },
}
