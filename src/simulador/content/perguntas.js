// Todo o conteúdo textual do simulador vive aqui — editar texto não exige tocar em lógica.

export const NICHO_OPCOES = [
  'Consultoria, mentoria ou coaching',
  'Saúde',
  'Outro',
]

export const NIVEL_CONSCIENCIA_OPCOES = [
  {
    valor: 'direcionamento_narrativa',
    label: 'Direcionamento e uma narrativa principal: vai além da frequência; sua narrativa é única, e com ela bem definida, tudo vira conteúdo',
  },
  {
    valor: 'novos_servicos_digitais',
    label: 'Implementação de novos serviços digitais, como infoproduto: você sente que já existe margem pra um novo serviço, mas precisa construir comunidade antes de vender pra sua própria base',
  },
  {
    valor: 'diferenciacao_real',
    label: 'Descobrir minha diferenciação real: seu diferencial não é sua técnica; todos podem vender algo parecido, só você pode falar do jeito que você fala, usando o que só você sabe',
  },
  { valor: 'nao_sei', label: 'Não sei dizer com clareza' },
]

export const CONTEXTO = {
  nicho: {
    pergunta: 'Em qual área você atua?',
  },
  nivelConsciencia: {
    pergunta: 'Hoje, o que você sente que mais falta na sua marca?',
  },
}

// Cada pergunta pontua 3, 1 ou 0 (a opção do meio nomeia a ilusão: a pessoa
// acha que tem aquilo, mas nunca saiu do papel ou da cabeça dela).
export const PERGUNTAS = [
  {
    id: 'C1',
    eixo: 'clareza',
    pergunta: 'Se alguém te pedisse pra resumir, em uma frase, o que te diferencia dos outros no seu mercado:',
    opcoes: [
      { texto: 'Eu responderia na hora, e é isso que uso pra me comunicar', pontos: 3 },
      { texto: 'Eu tentaria explicar, mas ia soar mais como "sou dedicado e faço bem feito" do que uma diferença real', pontos: 1 },
      { texto: 'Eu não conseguiria responder isso agora', pontos: 0 },
    ],
  },
  {
    id: 'C2',
    eixo: 'clareza',
    pergunta: 'Entre você e seus concorrentes, existe diferencial além da técnica que vocês entregam?',
    opcoes: [
      { texto: 'Sim, e é isso que as pessoas dizem quando descrevem meu trabalho pra outra pessoa', pontos: 3 },
      { texto: 'Acho que sim, mas nunca ouvi ninguém descrever isso de fora, só sei o que eu acho', pontos: 1 },
      { texto: 'Sinto que sou bem parecido com os concorrentes', pontos: 0 },
    ],
  },
  {
    id: 'C3',
    eixo: 'clareza',
    pergunta: 'Seu conteúdo fala mais sobre o que você entrega, ou sobre a transformação que gera?',
    opcoes: [
      { texto: 'Fala claramente sobre a transformação, dá pra entender o antes e depois de quem te contrata', pontos: 3 },
      { texto: 'Acho que humanizo, mas na prática é mais foto minha e rotina do que a transformação do cliente', pontos: 1 },
      { texto: 'É bem técnico e educacional, fala do que eu faço, não do que muda', pontos: 0 },
    ],
  },
  {
    id: 'R1',
    eixo: 'raiz',
    pergunta: 'Existe algo seu que você evita mostrar, mas que talvez seja parte do que te diferencia?',
    opcoes: [
      { texto: 'Sim, e já trago isso pra minha comunicação, mesmo sem saber exatamente como usar', pontos: 3 },
      { texto: 'Sei que existe, mas fica só na minha cabeça, nunca virou conteúdo', pontos: 1 },
      { texto: 'Não sei do que você está falando', pontos: 0 },
    ],
  },
  {
    id: 'R2',
    eixo: 'raiz',
    pergunta: 'Existe algo que você combate claramente, um jeito de pensar ou agir que considera errado no seu mercado?',
    opcoes: [
      { texto: 'Sim, e as pessoas já sabem que penso assim, mesmo sem eu repetir isso toda hora', pontos: 3 },
      { texto: 'Tenho uma opinião forte sobre isso, mas nunca coloquei isso pra fora', pontos: 1 },
      { texto: 'Nunca pensei sobre isso dessa forma', pontos: 0 },
    ],
  },
  {
    id: 'R3',
    eixo: 'raiz',
    pergunta: 'Sua história aparece na sua comunicação, ou fica só na sua cabeça?',
    opcoes: [
      { texto: 'Aparece, e as pessoas já associam essa história a mim', pontos: 3 },
      { texto: 'Eu conto, mas só quando alguém pergunta diretamente, nunca por iniciativa minha', pontos: 1 },
      { texto: 'Nunca parei pra formular isso como uma história', pontos: 0 },
    ],
  },
  {
    id: 'U1',
    eixo: 'universo',
    pergunta: 'Quando você publica algo, as pessoas comentam e trocam ideia, ou só curtem e seguem?',
    opcoes: [
      { texto: 'Comentam e trocam ideia comigo, de verdade', pontos: 3 },
      { texto: 'Curtem bastante, mas comentário é raro', pontos: 1 },
      { texto: 'Sinto que quase ninguém interage', pontos: 0 },
    ],
  },
  {
    id: 'U2',
    eixo: 'universo',
    pergunta: 'Você sabe identificar quando um conteúdo deve gerar autoridade, conexão ou venda, ou publica sem pensar nisso?',
    opcoes: [
      { texto: 'Sim, cada conteúdo que eu crio tem uma intenção clara antes de ser publicado', pontos: 3 },
      { texto: 'Eu penso nisso depois de publicar, não antes', pontos: 1 },
      { texto: 'Publico por instinto, sem pensar nessa diferença', pontos: 0 },
    ],
  },
  {
    id: 'U3',
    eixo: 'universo',
    pergunta: 'Quando alguém fala de você pra outra pessoa, isso já ajuda a te vender, ou você ainda precisa convencer do zero?',
    opcoes: [
      { texto: 'Minha reputação já faz parte do trabalho de convencer', pontos: 3 },
      { texto: 'As pessoas indicam meu nome, mas ainda preciso explicar tudo do zero na conversa', pontos: 1 },
      { texto: 'Quase sempre começo do zero, mesmo com indicação', pontos: 0 },
    ],
  },
  {
    id: 'Z1',
    eixo: 'zona_conversao',
    pergunta: 'Você sente que ainda precisa justificar o preço que cobra, ou seu posicionamento sustenta isso sozinho?',
    opcoes: [
      { texto: 'Meu posicionamento sustenta, raramente preciso justificar', pontos: 3 },
      { texto: 'Eu justifico, mas com argumento técnico (mais entrega, mais tempo), não com percepção de valor', pontos: 1 },
      { texto: 'Sinto que justifico bastante, e ainda assim aparece objeção', pontos: 0 },
    ],
  },
  {
    id: 'Z2',
    eixo: 'zona_conversao',
    pergunta: 'Quando um cliente chega até você, sabe identificar de onde ele veio?',
    opcoes: [
      { texto: 'Sei exatamente, o conteúdo, o canal, a origem', pontos: 3 },
      { texto: 'Sei que veio das redes, mas não sei de onde exatamente dentro delas', pontos: 1 },
      { texto: 'Não sei bem de onde vêm meus clientes', pontos: 0 },
    ],
  },
  {
    id: 'Z3',
    eixo: 'zona_conversao',
    pergunta: 'Você consegue descrever seu cliente ideal além de dados básicos como idade e localização?',
    opcoes: [
      { texto: 'Sim, sei o que ele pensa, consome e onde encontrar essa pessoa, uso isso pra guiar minha comunicação', pontos: 3 },
      { texto: 'Tenho uma descrição, mas é mais um perfil genérico do que algo específico', pontos: 1 },
      { texto: 'Só sei descrever de forma bem genérica', pontos: 0 },
    ],
  },
]
