import { GARGALO_LABELS, RESULTADOS } from '../content/resultados'

export default function Resultado({ nome, pontuacao, onNext }) {
  const { gargaloDominante } = pontuacao
  const paragrafos = RESULTADOS[gargaloDominante]

  return (
    <div className="sim-screen">
      <h2 className="sim-headline" style={{ fontSize: 22 }}>
        {nome}, seu gargalo dominante é: <span style={{ color: 'var(--blue)' }}>{GARGALO_LABELS[gargaloDominante]}</span>
      </h2>

      {paragrafos.map((paragrafo, i) => (
        <p key={i} className="sim-body">{paragrafo}</p>
      ))}

      <div className="sim-actions">
        <button className="sim-btn sim-btn-primary" onClick={onNext}>
          Continuar
        </button>
      </div>
    </div>
  )
}
