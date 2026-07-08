// Todo o conteúdo textual do simulador vive aqui — editar texto não exige tocar em lógica.

export const NICHO_OPCOES = [
  'Consultoria',
  'Coaching / Mentoria',
  'Saúde e bem-estar',
  'Direito',
  'Educação / Cursos',
  'Criador de conteúdo',
  'Serviços criativos',
  'Outro',
]

export const NIVEL_CONSCIENCIA_OPCOES = [
  { valor: 'mais_conteudo', label: 'Mais conteúdo / mais frequência' },
  { valor: 'mais_estrategia', label: 'Mais estratégia / mais direção' },
  { valor: 'diferenciacao_real', label: 'Diferenciação real — sinto que sou bom, mas pareço "mais um"' },
  { valor: 'nao_sei', label: 'Não sei dizer com clareza' },
]

export const CONTEXTO = {
  nicho: {
    pergunta: 'Em qual área você atua?',
  },
  nivelConsciencia: {
    pergunta: 'Hoje, o que você sente que mais te falta?',
  },
}

// Cada pergunta pontua de 0 a 3 (3 = mais forte/claro, 0 = mais confuso).
export const PERGUNTAS = [
  {
    id: 'C1',
    eixo: 'clareza',
    pergunta: 'Se alguém te pedisse pra resumir, em uma frase, o que te diferencia dos outros no seu mercado, você conseguiria responder na hora?',
    opcoes: [
      { texto: 'Sim, tenho isso muito claro e uso na minha comunicação', pontos: 3 },
      { texto: 'Tenho uma ideia, mas ainda não condensei em algo forte', pontos: 2 },
      { texto: 'Sei que sou bom no que faço, mas ainda pareço "mais um" no nicho', pontos: 1 },
      { texto: 'Nunca parei pra pensar nisso', pontos: 0 },
    ],
  },
  {
    id: 'C2',
    eixo: 'clareza',
    pergunta: 'Quando alguém pesquisa sobre você antes de decidir se contrata, o que encontra parece diferente dos outros profissionais da sua área, ou parecido?',
    opcoes: [
      { texto: 'Parece bem diferente e reconhecível', pontos: 3 },
      { texto: 'Um pouco diferente, mas não é forte', pontos: 2 },
      { texto: 'Parece bastante com os concorrentes', pontos: 1 },
      { texto: 'Nunca analisei isso', pontos: 0 },
    ],
  },
  {
    id: 'C3',
    eixo: 'clareza',
    pergunta: 'Seu conteúdo fala mais sobre o que você faz, ou sobre o que muda na vida de quem te contrata?',
    opcoes: [
      { texto: 'Fala claramente sobre a transformação, não só a entrega', pontos: 3 },
      { texto: 'Um pouco dos dois', pontos: 2 },
      { texto: 'Ainda fala principalmente do que eu faço', pontos: 1 },
      { texto: 'Nunca pensei nessa diferença', pontos: 0 },
    ],
  },
  {
    id: 'R1',
    eixo: 'raiz',
    pergunta: 'Existe algo seu — uma característica, opinião ou forma de pensar — que você evita mostrar, mas que talvez seja parte do que te diferencia?',
    opcoes: [
      { texto: 'Já identifiquei isso e comecei a mostrar', pontos: 3 },
      { texto: 'Tenho uma noção, mas ainda evito', pontos: 2 },
      { texto: 'Talvez exista, nunca parei pra pensar', pontos: 1 },
      { texto: 'Não sei do que você tá falando', pontos: 0 },
    ],
  },
  {
    id: 'R2',
    eixo: 'raiz',
    pergunta: 'Sua forma de pensar sobre o seu mercado é bem diferente da maioria, ou é uma versão um pouco ajustada do que todo mundo já faz?',
    opcoes: [
      { texto: 'É bem diferente mesmo', pontos: 3 },
      { texto: 'Tenho diferenças, mas não sei se são fortes', pontos: 2 },
      { texto: 'Acho que sigo bastante o padrão', pontos: 1 },
      { texto: 'Nunca comparei assim', pontos: 0 },
    ],
  },
  {
    id: 'R3',
    eixo: 'raiz',
    pergunta: 'Sua forma de trabalhar nasceu de uma experiência ou visão sua, ou foi mais inspirada em quem você admira?',
    opcoes: [
      { texto: 'Nasceu de algo genuinamente meu', pontos: 3 },
      { texto: 'Um pouco das duas coisas', pontos: 2 },
      { texto: 'Foi mais inspirada em referências', pontos: 1 },
      { texto: 'Nunca refleti sobre isso', pontos: 0 },
    ],
  },
  {
    id: 'U1',
    eixo: 'universo',
    pergunta: 'Quando você escreve ou grava algo pras redes, é você mesmo falando, ou uma versão mais "profissional"/ensaiada?',
    opcoes: [
      { texto: 'É genuinamente eu, sem filtro', pontos: 3 },
      { texto: 'Parecido comigo, mas ajustado', pontos: 2 },
      { texto: 'Bem diferente de como eu realmente sou', pontos: 1 },
      { texto: 'Nunca percebi essa diferença', pontos: 0 },
    ],
  },
  {
    id: 'U2',
    eixo: 'universo',
    pergunta: 'Seu conteúdo entrega tudo de uma vez, ou deixa a pessoa curiosa pra entender mais sobre você?',
    opcoes: [
      { texto: 'Gera curiosidade, as pessoas voltam', pontos: 3 },
      { texto: 'Às vezes, não sempre', pontos: 2 },
      { texto: 'Geralmente entrego tudo de uma vez', pontos: 1 },
      { texto: 'Nunca pensei em construir assim', pontos: 0 },
    ],
  },
  {
    id: 'U3',
    eixo: 'universo',
    pergunta: 'Quando alguém fala de você pra outra pessoa, isso já ajuda a te vender, ou você ainda precisa convencer do zero em cada conversa nova?',
    opcoes: [
      { texto: 'Minha reputação já ajuda bastante', pontos: 3 },
      { texto: 'Ajuda um pouco, mas ainda preciso convencer', pontos: 2 },
      { texto: 'Quase sempre preciso convencer do zero', pontos: 1 },
      { texto: 'Não sei como falam de mim', pontos: 0 },
    ],
  },
  {
    id: 'Z1',
    eixo: 'zona_conversao',
    pergunta: 'Você sente que ainda precisa justificar o preço que cobra, ou seu posicionamento já sustenta esse valor sozinho?',
    opcoes: [
      { texto: 'Sustenta sozinho, raramente justifico', pontos: 3 },
      { texto: 'Às vezes ainda explico', pontos: 2 },
      { texto: 'Sinto que justifico bastante', pontos: 1 },
      { texto: 'Nunca parei pra perceber', pontos: 0 },
    ],
  },
  {
    id: 'Z2',
    eixo: 'zona_conversao',
    pergunta: 'Seus clientes vêm de um processo previsível que você controla, ou de sorte, timing ou indicação pontual?',
    opcoes: [
      { texto: 'De um processo que eu controlo', pontos: 3 },
      { texto: 'Um pouco dos dois', pontos: 2 },
      { texto: 'Principalmente sorte/indicação', pontos: 1 },
      { texto: 'Não sei bem de onde vêm', pontos: 0 },
    ],
  },
  {
    id: 'Z3',
    eixo: 'zona_conversao',
    pergunta: 'Quando alguém te procura pra contratar, essa pessoa já chega convencida, ou você ainda precisa vender a ideia do zero?',
    opcoes: [
      { texto: 'Já chega convencida', pontos: 3 },
      { texto: 'Às vezes sim, às vezes não', pontos: 2 },
      { texto: 'Quase sempre preciso vender a ideia', pontos: 1 },
      { texto: 'Nunca refleti sobre isso', pontos: 0 },
    ],
  },
]
