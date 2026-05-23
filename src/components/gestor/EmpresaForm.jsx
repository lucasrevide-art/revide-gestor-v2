import React, { useState } from 'react'

const PALETTE = [
  '#3B82F6', // azul
  '#22c55e', // verde
  '#f59e0b', // amarelo
  '#ef4444', // vermelho
  '#8b5cf6', // roxo
  '#ec4899', // rosa
  '#14b8a6', // teal
  '#f97316', // laranja
]

export default function EmpresaForm({ onSave, onClose }) {
  const [nome, setNome] = useState('')
  const [cor, setCor] = useState(PALETTE[0])
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!nome.trim()) return
    setSaving(true)
    await onSave({ nome: nome.trim(), cor })
    setSaving(false)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <span className="modal-title">Nova empresa</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Nome *</label>
              <input
                className="form-input"
                placeholder="Ex: Dzoom, Revide, Portugal..."
                value={nome}
                onChange={e => setNome(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cor</label>
              <div className="color-swatches">
                {PALETTE.map(c => (
                  <button
                    type="button"
                    key={c}
                    className={`color-swatch ${cor === c ? 'active' : ''}`}
                    style={{ background: c, color: c }}
                    onClick={() => setCor(c)}
                    aria-label={`Cor ${c}`}
                  />
                ))}
                <input
                  type="color"
                  className="color-custom"
                  value={cor}
                  onChange={e => setCor(e.target.value)}
                  title="Cor personalizada"
                />
              </div>
            </div>

            <div className="empresa-preview">
              <span
                className="task-company-badge"
                style={{
                  background: cor + '18',
                  color: cor === '#000000' ? '#6366f1' : cor,
                  borderColor: cor + '40',
                }}
              >
                {nome.trim() || 'Prévia da empresa'}
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Salvando...' : 'Adicionar empresa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
