import React, { useState, useEffect } from 'react'
import { WEEKDAYS } from '../../utils/helpers'

const EMPTY = {
  titulo: '',
  empresa_id: '',
  prioridade: 'normal',
  status: 'a_fazer',
  data_inicio: '',
  data_entrega: '',
  descricao: '',
  recorrente: false,
  recorrencia_tipo: 'dias_semana',
  recorrencia_dias: [],
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
        recorrente: !!task.recorrente,
        recorrencia_tipo: task.recorrencia_tipo || 'dias_semana',
        recorrencia_dias: task.recorrencia_dias || [],
      })
    } else {
      setForm(EMPTY)
    }
  }, [task])

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function toggleDia(d) {
    setForm(prev => {
      const has = prev.recorrencia_dias.includes(d)
      const dias = has
        ? prev.recorrencia_dias.filter(x => x !== d)
        : [...prev.recorrencia_dias, d].sort((a, b) => a - b)
      return { ...prev, recorrencia_dias: dias }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.titulo.trim()) return
    setSaving(true)
    await onSave({
      titulo: form.titulo,
      empresa_id: form.empresa_id || null,
      prioridade: form.prioridade,
      status: form.status,
      data_inicio: form.data_inicio || null,
      data_entrega: form.data_entrega || null,
      descricao: form.descricao || null,
      recorrente: form.recorrente,
      recorrencia_tipo: form.recorrente ? form.recorrencia_tipo : null,
      recorrencia_dias:
        form.recorrente && form.recorrencia_tipo === 'dias_semana'
          ? form.recorrencia_dias
          : null,
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
                  <option value="feito">Finalizado</option>
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

            {/* ─── Recorrência ─── */}
            <div className="recorrencia-box">
              <label className="recorrencia-toggle">
                <input
                  type="checkbox"
                  checked={form.recorrente}
                  onChange={e => set('recorrente', e.target.checked)}
                />
                <span>🔁 Tarefa recorrente</span>
              </label>

              {form.recorrente && (
                <>
                  <div className="form-group">
                    <label className="form-label">Repetir</label>
                    <select
                      className="form-select"
                      value={form.recorrencia_tipo}
                      onChange={e => set('recorrencia_tipo', e.target.value)}
                    >
                      <option value="diaria">Todo dia</option>
                      <option value="dias_semana">Em dias específicos da semana</option>
                      <option value="semanal">Toda semana (a cada 7 dias)</option>
                    </select>
                  </div>

                  {form.recorrencia_tipo === 'dias_semana' && (
                    <div className="weekday-chips">
                      {WEEKDAYS.map(w => (
                        <button
                          type="button"
                          key={w.value}
                          className={`weekday-chip ${form.recorrencia_dias.includes(w.value) ? 'active' : ''}`}
                          onClick={() => toggleDia(w.value)}
                        >
                          {w.short}
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="recorrencia-hint">
                    Ao finalizar, a tarefa some do quadro e reaparece sozinha em "A fazer" no próximo dia previsto.
                  </p>
                </>
              )}
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
