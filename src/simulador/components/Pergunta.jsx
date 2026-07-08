export default function Pergunta({ pergunta, indice, total, onResponder }) {
  return (
    <div className="sim-screen">
      <span className="sim-eyebrow">Pergunta {indice + 1} de {total}</span>
      <p className="sim-question">{pergunta.pergunta}</p>
      <div className="sim-options">
        {pergunta.opcoes.map((opcao, i) => (
          <button
            key={i}
            type="button"
            className="sim-option"
            onClick={() => onResponder(pergunta.id, opcao.pontos)}
          >
            {opcao.texto}
          </button>
        ))}
      </div>
    </div>
  )
}
