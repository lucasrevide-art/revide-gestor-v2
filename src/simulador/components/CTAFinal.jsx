import { CTA_RAMIFICADO, LINK_AGENDAMENTO, CONTATOS } from '../content/textosFixos'

export default function CTAFinal({ interesse, onVerDiagnostico }) {
  const conteudo = CTA_RAMIFICADO[interesse]

  return (
    <div className="sim-screen">
      <p className="sim-body">{conteudo.texto}</p>

      <div className="sim-actions">
        {conteudo.mostrarAgendar ? (
          <a
            className="sim-btn sim-btn-primary"
            href={LINK_AGENDAMENTO}
            target="_blank"
            rel="noopener noreferrer"
          >
            {conteudo.botao}
          </a>
        ) : (
          <button className="sim-btn sim-btn-ghost" onClick={onVerDiagnostico}>
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
