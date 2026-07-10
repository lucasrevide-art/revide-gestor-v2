import { useState } from 'react'
import { NICHO_OPCOES, NIVEL_CONSCIENCIA_OPCOES, CONTEXTO } from '../content/perguntas'

export default function Contexto({ onNext }) {
  const [nicho, setNicho] = useState('')
  const [nichoOutro, setNichoOutro] = useState('')
  const [nivelConsciencia, setNivelConsciencia] = useState('')

  const ehOutro = nicho === 'Outro'
  const nichoValido = ehOutro ? nichoOutro.trim().length > 0 : Boolean(nicho)
  const podeAvancar = nichoValido && nivelConsciencia

  function avancar() {
    const nichoFinal = ehOutro ? nichoOutro.trim() : nicho
    onNext({ nicho: nichoFinal, nivelConsciencia })
  }

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

        {ehOutro && (
          <input
            className="form-input"
            style={{ marginTop: 10 }}
            type="text"
            placeholder="Qual área?"
            value={nichoOutro}
            onChange={e => setNichoOutro(e.target.value)}
            autoFocus
          />
        )}
      </div>

      <div className="sim-select-wrap">
        <p className="sim-question">{CONTEXTO.nivelConsciencia.pergunta}</p>
        <div className="sim-options">
          {NIVEL_CONSCIENCIA_OPCOES.map(opcao => (
            <button
              key={opcao.valor}
              type="button"
              className="sim-option"
              style={nivelConsciencia === opcao.valor ? { borderColor: '#d4d4d4', background: 'linear-gradient(135deg,#e8e8e8,#a8a8a8)', color: '#0a0a0a' } : undefined}
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
          onClick={avancar}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
