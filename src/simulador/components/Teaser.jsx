import { TEASER } from '../content/textosFixos'
import { GARGALO_LABELS } from '../content/resultados'

export default function Teaser({ gargaloDominante, onNext }) {
  return (
    <div className="sim-screen">
      <p className="sim-body">{TEASER.introMetodo}</p>
      <p className="sim-subheadline">{TEASER.intro}</p>
      <span className="sim-gargalo-tag">{GARGALO_LABELS[gargaloDominante]}</span>
      <p className="sim-body">{TEASER.pergunta}</p>
      <div className="sim-actions">
        <button className="sim-btn sim-btn-primary" onClick={onNext}>
          {TEASER.botao}
        </button>
      </div>
    </div>
  )
}
