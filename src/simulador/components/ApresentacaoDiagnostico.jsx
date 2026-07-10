import { APRESENTACAO_DIAGNOSTICO, PERGUNTA_INTERESSE } from '../content/textosFixos'
import { RichText } from '../lib/richText'

export default function ApresentacaoDiagnostico({ onResponderInteresse }) {
  return (
    <div className="sim-screen" style={{ textAlign: 'center' }}>
      <span className="sim-eyebrow">Diagnóstico Estratégico Cruz</span>

      <p className="sim-body"><RichText text={APRESENTACAO_DIAGNOSTICO.texto} /></p>

      <ul className="sim-list" style={{ textAlign: 'left' }}>
        {APRESENTACAO_DIAGNOSTICO.entregaveis.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <p className="sim-body">{APRESENTACAO_DIAGNOSTICO.fechamento}</p>

      <div className="sim-block" style={{ borderBottom: 'none', textAlign: 'left' }}>
        <p className="sim-question" style={{ textAlign: 'center' }}>{PERGUNTA_INTERESSE.pergunta}</p>
        <div className="sim-options">
          {PERGUNTA_INTERESSE.opcoes.map(opcao => (
            <button
              key={opcao.valor}
              type="button"
              className="sim-option"
              onClick={() => onResponderInteresse(opcao.valor)}
            >
              {opcao.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
