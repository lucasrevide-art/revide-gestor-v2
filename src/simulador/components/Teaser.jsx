import { TEASER } from '../content/textosFixos'
import { GARGALO_LABELS } from '../content/resultados'

export default function Teaser({ gargaloDominante, onNext }) {
  return (
    <div className="sim-screen" style={{ alignItems: 'center', textAlign: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <span className="sim-eyebrow">Método Cruz</span>
      <p className="sim-body" style={{ maxWidth: 460 }}>
        {TEASER.introMetodo}
      </p>
      <p className="sim-subheadline" style={{ maxWidth: 420, marginBottom: 6 }}>{TEASER.intro}</p>
      <div className="sim-gargalo-name">{GARGALO_LABELS[gargaloDominante]}</div>
      <p className="sim-body" style={{ maxWidth: 420 }}>{TEASER.pergunta}</p>
      <div className="sim-actions" style={{ alignItems: 'center', width: '100%' }}>
        <button className="sim-btn sim-btn-primary" onClick={onNext}>
          {TEASER.botao}
        </button>
      </div>
    </div>
  )
}
