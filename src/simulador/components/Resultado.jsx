import { GARGALO_LABELS, RESULTADOS } from '../content/resultados'

export default function Resultado({ nome, pontuacao, onNext }) {
  const { gargaloDominante } = pontuacao
  const paragrafos = RESULTADOS[gargaloDominante]

  return (
    <div className="sim-screen">
      <span className="sim-eyebrow" style={{ textAlign: 'center' }}>Seu diagnóstico</span>
      <h2 className="sim-headline" style={{ fontSize: 22, fontWeight: 400, textAlign: 'center', color: 'var(--sim-ink-soft)', marginBottom: -8 }}>
        {nome}, seu gargalo dominante é:
      </h2>
      <div className="sim-gargalo-name" style={{ fontSize: 44 }}>{GARGALO_LABELS[gargaloDominante]}</div>

      {paragrafos.map((paragrafo, i) => (
        <p key={i} className="sim-body">{paragrafo}</p>
      ))}

      <div className="sim-actions" style={{ alignItems: 'center' }}>
        <button className="sim-btn sim-btn-primary" onClick={onNext} style={{ width: 'auto', padding: '17px 34px' }}>
          Continuar
        </button>
      </div>
    </div>
  )
}
