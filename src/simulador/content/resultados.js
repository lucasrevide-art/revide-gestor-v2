// Blocos modulares do resultado final (seção 8 da spec).
// Ordem de montagem: Headline → Gargalo Dominante → Estágio de Comunidade → Gargalo Secundário → Direção.

export const GARGALO_LABELS = {
  clareza: 'Clareza',
  raiz: 'Raiz',
  universo: 'Universo',
  zona_conversao: 'Zona de Conversão',
}

export const BLOCO_GARGALO_DOMINANTE = {
  clareza:
    'Você entrega resultado — isso não está em jogo. O problema é que sua competência ainda não virou percepção. Quando alguém chega até você, provavelmente ainda precisa de várias conversas, indicações ou provas até confiar. Isso não é falta de qualidade. É falta de uma versão condensada e específica de quem você é — algo que a pessoa entenda antes de te conhecer pessoalmente. Sem isso, cada aparição sua começa do zero. Nada se acumula.',
  raiz:
    'Você provavelmente já ouviu "seja mais autêntico" e achou vago. Não é sobre isso. É sobre existir, na sua comunicação, uma verdade que só você carrega — uma forma de pensar seu ofício que talvez você ainda evite mostrar, porque parece pequena ou específica demais pra ser "profissional". É exatamente aí que mora sua diferenciação real. Sem essa raiz, sua marca é uma versão bem executada do que todo mundo no seu mercado já faz.',
  universo:
    'Sua presença hoje provavelmente informa — mas não retém. As pessoas veem, talvez curtam, mas não voltam pensando em você especificamente. Isso acontece quando o tom de voz soa mais "profissional genérico" do que extensão de quem você é, e quando o conteúdo entrega tudo de uma vez, sem deixar nada pra a pessoa completar sozinha depois. Reputação não se constrói numa aparição. Se constrói em camadas, com uma voz reconhecível.',
  zona_conversao:
    'Você provavelmente ainda gasta energia justificando o que cobra — explicando valor numa conversa que já deveria ter sido resolvida antes dela começar. Isso não é problema de preço. É sinal de que sua reputação ainda não está fazendo esse trabalho por você. Enquanto isso não muda, cada novo cliente exige convencimento do zero — e isso tem limite de quanto você consegue escalar sozinho.',
}

export const BLOCO_ESTAGIO_COMUNIDADE = {
  dispersa:
    'Hoje, quem te acompanha majoritariamente observa — não participa. Isso não é falha sua: é o estágio normal antes de existir uma causa clara o suficiente pra as pessoas quererem fazer parte dela, não só assistir.',
  interessada:
    'Você já passou do estágio de ser só observado — existe gente prestando atenção de verdade no que você faz. Mas ainda falta o próximo salto: transformar quem acompanha em quem se identifica e defende o que você representa.',
  inicial:
    'Você já tem algo raro: pessoas que respondem, comentam e se posicionam com você, não só sobre você. Isso é a base de uma reputação que vende sozinha — a próxima etapa é dar estrutura e intenção pra isso crescer sem se diluir.',
}

export function blocoGargaloSecundario(gargaloSecundarioLabel) {
  return `Vale reforçar: seu segundo ponto de atenção é **${gargaloSecundarioLabel}** — não é a prioridade agora, mas é o próximo degrau depois de resolver o principal.`
}

export const BLOCO_DIRECAO =
  'O caminho a partir daqui não é postar mais. É descer até a raiz da sua marca antes de qualquer execução — é isso que separa quem constrói autoridade de quem só ocupa espaço no feed.'
