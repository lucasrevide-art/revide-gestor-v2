import {
  GARGALO_LABELS,
  BLOCO_GARGALO_DOMINANTE,
  BLOCO_ESTAGIO_COMUNIDADE,
  blocoGargaloSecundario,
  BLOCO_DIRECAO,
} from '../content/resultados'
import { RichText } from '../lib/richText'

export default function Resultado({ nome, pontuacao, onNext }) {
  const { gargaloDominante, gargaloSecundario, estagioComunidade } = pontuacao

  return (
    <div className="sim-screen">
      <h2 className="sim-headline" style={{ fontSize: 22 }}>
        {nome}, seu gargalo dominante é: <span style={{ color: 'var(--blue)' }}>{GARGALO_LABELS[gargaloDominante]}</span>
      </h2>

      <div className="sim-block">
        <span className="sim-block-label">Gargalo dominante</span>
        <p className="sim-body">{BLOCO_GARGALO_DOMINANTE[gargaloDominante]}</p>
      </div>

      <div className="sim-block">
        <span className="sim-block-label">Sua comunidade hoje</span>
        <p className="sim-body">{BLOCO_ESTAGIO_COMUNIDADE[estagioComunidade]}</p>
      </div>

      <div className="sim-block">
        <span className="sim-block-label">Também vale atenção</span>
        <p className="sim-body"><RichText text={blocoGargaloSecundario(GARGALO_LABELS[gargaloSecundario])} /></p>
      </div>

      <div className="sim-block">
        <span className="sim-block-label">Direção</span>
        <p className="sim-body">{BLOCO_DIRECAO}</p>
      </div>

      <div className="sim-actions">
        <button className="sim-btn sim-btn-primary" onClick={onNext}>
          Continuar
        </button>
      </div>
    </div>
  )
}
