import { HOOK } from '../content/textosFixos'

export default function Hook({ onNext }) {
  return (
    <div className="sim-screen">
      <h1 className="sim-headline">{HOOK.headline}</h1>
      <p className="sim-subheadline">{HOOK.subheadline}</p>
      <p className="sim-microcopy">{HOOK.microcopy}</p>
      <div className="sim-actions">
        <button className="sim-btn sim-btn-primary" onClick={onNext}>
          {HOOK.botao}
        </button>
      </div>
    </div>
  )
}
