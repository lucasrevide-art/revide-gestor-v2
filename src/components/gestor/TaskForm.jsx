import React, { useState, useEffect } from 'react'

const EMPTY = {
  titulo: '',
  empresa_id: '',
  prioridade: 'normal',
  status: 'a_fazer',
  data_inicio: '',
  data_entrega: '',
  descricao: '',
}

export default function TaskForm({ task, empresas, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (task) {
      setForm({
        titulo: task.titulo || '',
        empresa_id: task.empresa_id || '',
        prioridade: task.prioridade || 'normal',
        status: task.status || 'a_fazer',
        data_inicio: task.data_inicio || '',
        data_entrega: task.data_entrega || '',
        descricao: task.descricao || '',
      })
    } else {
      setForm(EMPTY)
    }
  }, [task])

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.titulo.trim()) return
    setSaving(true)
    await onSave({
      ...form,
      empresa_id: form.empresa_id || null,
      data_inicio: form.data_inicio || null,
      data_entrega: form.data_entrega || null,
      descricao: form.descricao || null,
    })
    setSaving(false)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">
            {task ? 'Editar tarefa' : 'Nova tarefa'}
          </span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Título *</label>
              <input
                className="form-input"
                placeholder="O que precisa ser feito?"
                value={form.titulo}
                onChange={e => set('titulo', e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Empresa</label>
                <select
                  className="form-select"
                  value={form.empresa_id}
                  onChange={e => set('empresa_id', e.target.value ? Number(e.target.value) : '')}
                >
                  <option value="">Sem empresa</option>
                  {empresas.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.nome}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Prioridade</label>
                <select
                  className="form-select"
                  value={form.prioridade}
                  onChange={e => set('prioridade', e.target.value)}
                >
                  <option value="urgente">🔴 Urgente</option>
                  <option value="normal">🔵 Normal</option>
                  <option value="pode_esperar">⚪ Pode esperar</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={form.status}
                  onChange={e => set('status', e.target.value)}
                >
                  <option value="a_fazer">A fazer</option>
                  <option value="em_andamento">Em andamento</option>
                  <option value="feito">Feito</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Data de entrega</label>
                <input
                  type="date"
                  className="form-input"
                  value={form.data_entrega}
                  onChange={e => set('data_entrega', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Data de início</label>
              <input
                type="date"
                className="form-input"
                value={form.data_inicio}
                onChange={e => set('data_inicio', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Descrição</label>
              <textarea
                className="form-textarea"
                placeholder="Detalhes opcionais..."
                value={form.descricao}
                onChange={e => set('descricao', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Salvando...' : task ? 'Salvar alterações' : 'Criar tarefa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
