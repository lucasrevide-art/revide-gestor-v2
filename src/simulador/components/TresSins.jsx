import { TRES_SINS } from '../content/textosFixos'

export default function TresSins({ passo, onNext }) {
  const texto = TRES_SINS[passo]
  const ultimo = passo === TRES_SINS.length - 1

  return (
    <div className="sim-screen">
      <p className="sim-body">{texto}</p>
      <div className="sim-actions">
        <button className="sim-btn sim-btn-primary" onClick={onNext}>
          {ultimo ? 'Ver meu diagnóstico' : 'Continuar'}
        </button>
      </div>
    </div>
  )
}
