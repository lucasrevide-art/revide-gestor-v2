import { useState } from 'react'
import { NICHO_OPCOES, NIVEL_CONSCIENCIA_OPCOES, CONTEXTO } from '../content/perguntas'

export default function Contexto({ onNext }) {
  const [nicho, setNicho] = useState('')
  const [nivelConsciencia, setNivelConsciencia] = useState('')

  const podeAvancar = nicho && nivelConsciencia

  return (
    <div className="sim-screen">
      <span className="sim-eyebrow">Antes de começar</span>

      <div className="sim-select-wrap">
        <label className="sim-select-label" htmlFor="sim-nicho">{CONTEXTO.nicho.pergunta}</label>
        <select
          id="sim-nicho"
          className="form-select"
          value={nicho}
          onChange={e => setNicho(e.target.value)}
        >
          <option value="" disabled>Selecione uma opção</option>
          {NICHO_OPCOES.map(opcao => (
            <option key={opcao} value={opcao}>{opcao}</option>
          ))}
        </select>
      </div>

      <div className="sim-select-wrap">
        <p className="sim-question">{CONTEXTO.nivelConsciencia.pergunta}</p>
        <div className="sim-options">
          {NIVEL_CONSCIENCIA_OPCOES.map(opcao => (
            <button
              key={opcao.valor}
              type="button"
              className="sim-option"
              style={nivelConsciencia === opcao.valor ? { borderColor: 'var(--blue)', background: 'var(--card-hover)' } : undefined}
              onClick={() => setNivelConsciencia(opcao.valor)}
            >
              {opcao.label}
            </button>
          ))}
        </div>
      </div>

      <div className="sim-actions">
        <button
          className="sim-btn sim-btn-primary"
          disabled={!podeAvancar}
          onClick={() => onNext({ nicho, nivelConsciencia })}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
