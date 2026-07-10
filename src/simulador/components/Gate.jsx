import { useState } from 'react'
import { GATE } from '../content/textosFixos'

export default function Gate({ onSubmit, submitting }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  const podeEnviar = nome.trim() && email.trim() && whatsapp.trim()

  function handleSubmit(e) {
    e.preventDefault()
    if (!podeEnviar || submitting) return
    onSubmit({ nome: nome.trim(), email: email.trim(), whatsapp: whatsapp.trim() })
  }

  return (
    <form className="sim-screen" onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
      <span className="sim-eyebrow">Último passo</span>
      <h2 className="sim-headline" style={{ fontSize: 26 }}>{GATE.titulo}</h2>
      <p className="sim-subheadline">{GATE.subtitulo}</p>

      <div className="sim-fields" style={{ textAlign: 'left' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="sim-nome">Nome</label>
          <input
            id="sim-nome"
            className="form-input"
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            autoComplete="name"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="sim-email">E-mail</label>
          <input
            id="sim-email"
            className="form-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="sim-whatsapp">WhatsApp</label>
          <input
            id="sim-whatsapp"
            className="form-input"
            type="tel"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            autoComplete="tel"
            placeholder="(00) 00000-0000"
            required
          />
        </div>
      </div>

      <div className="sim-actions">
        <button className="sim-btn sim-btn-primary" type="submit" disabled={!podeEnviar || submitting}>
          {submitting ? 'Enviando...' : GATE.botao}
        </button>
      </div>
    </form>
  )
}
