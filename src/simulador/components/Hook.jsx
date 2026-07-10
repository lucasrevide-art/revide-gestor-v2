import { HOOK } from '../content/textosFixos'

export default function Hook({ onNext }) {
  return (
    <div className="sim-screen" style={{ alignItems: 'center', textAlign: 'center' }}>
      <div className="sim-wordmark">
        <span className="sim-wordmark-serif">Lucas</span>
        <span className="sim-wordmark-sans"> Cruz</span>
      </div>

      <span className="sim-eyebrow" style={{ marginTop: '6vh' }}>Diagnóstico de marca pessoal</span>

      <h1 className="sim-headline" style={{ fontSize: 30, maxWidth: 460 }}>{HOOK.headline}</h1>
      <p className="sim-subheadline" style={{ maxWidth: 460 }}>{HOOK.subheadline}</p>
      <p className="sim-microcopy">{HOOK.microcopy}</p>

      <div className="sim-actions" style={{ alignItems: 'center', width: '100%' }}>
        <button className="sim-btn sim-btn-primary" onClick={onNext}>
          {HOOK.botao}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
