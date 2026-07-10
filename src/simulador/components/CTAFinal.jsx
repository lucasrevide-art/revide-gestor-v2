import { CTA_RAMIFICADO, LINK_AGENDAMENTO, CONTATOS } from '../content/textosFixos'

export default function CTAFinal({ interesse, onVerDiagnostico }) {
  const conteudo = CTA_RAMIFICADO[interesse]

  return (
    <div className="sim-screen" style={{ alignItems: 'center', textAlign: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <span className="sim-eyebrow">Próximo passo</span>
      <p className="sim-headline" style={{ fontSize: 24, fontWeight: 400, maxWidth: 440 }}>{conteudo.texto}</p>

      <div className="sim-actions" style={{ alignItems: 'center', width: '100%' }}>
        {conteudo.mostrarAgendar ? (
          <a
            className="sim-btn sim-btn-primary"
            href={LINK_AGENDAMENTO}
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: 'auto', padding: '17px 34px' }}
          >
            {conteudo.botao}
          </a>
        ) : (
          <button className="sim-btn sim-btn-ghost" onClick={onVerDiagnostico} style={{ width: 'auto', padding: '17px 34px' }}>
            {conteudo.botao}
          </button>
        )}
      </div>

      <div className="sim-contatos">
        {CONTATOS.map(contato => (
          <a
            key={contato.label}
            className="sim-contato-link"
            href={contato.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span aria-hidden="true">{contato.icone}</span>
            {contato.label}
          </a>
        ))}
      </div>
    </div>
  )
}
