import { TRES_SINS } from '../content/textosFixos'

export default function TresSins({ passo, onNext }) {
  const texto = TRES_SINS[passo]
  const ultimo = passo === TRES_SINS.length - 1

  return (
    <div className="sim-screen" style={{ alignItems: 'center', textAlign: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <span className="sim-eyebrow">Antes de continuar</span>
      <p className="sim-headline" style={{ fontSize: 24, fontWeight: 400, maxWidth: 440 }}>{texto}</p>
      <div className="sim-actions" style={{ alignItems: 'center', width: '100%' }}>
        <button className="sim-btn sim-btn-primary" onClick={onNext}>
          {ultimo ? 'Ver meu diagnóstico' : 'Continuar'}
        </button>
      </div>
    </div>
  )
}
