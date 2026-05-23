import React, { useState, useMemo } from 'react'
import { supabase } from '../utils/supabaseClient'
import TaskCard from './gestor/TaskCard'
import TaskForm from './gestor/TaskForm'
import EmpresaForm from './gestor/EmpresaForm'
import Filters from './gestor/Filters'
import { STATUS_COLUMNS, getNextOccurrence, getTodayStr } from '../utils/helpers'
import '../styles/GestorTarefas.css'

export default function GestorTarefas({ tasks, empresas, onTasksChange }) {
  const [filters, setFilters] = useState({ empresa: null, prioridade: null })
  const [showForm, setShowForm] = useState(false)
  const [showEmpresa, setShowEmpresa] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [search, setSearch] = useState('')
  const [dragOver, setDragOver] = useState(null)

  // Tarefas visíveis no quadro (as "agendadas" ficam ocultas até o dia chegar)
  const visible = useMemo(() => {
    return tasks.filter(t => {
      if (t.status === 'agendada') return false
      if (filters.empresa && t.empresa_id !== filters.empresa) return false
      if (filters.prioridade && t.prioridade !== filters.prioridade) return false
      if (search && !t.titulo.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [tasks, filters, search])

  // Agrupa por status (coluna) e ordena por prioridade dentro de cada coluna
  const columns = useMemo(() => {
    const order = { urgente: 0, normal: 1, pode_esperar: 2 }
    const byStatus = {}
    STATUS_COLUMNS.forEach(c => { byStatus[c.value] = [] })
    visible.forEach(t => { if (byStatus[t.status]) byStatus[t.status].push(t) })
    Object.values(byStatus).forEach(list =>
      list.sort((a, b) => (order[a.prioridade] ?? 9) - (order[b.prioridade] ?? 9))
    )
    return byStatus
  }, [visible])

  // Muda o status de uma tarefa. Se uma tarefa RECORRENTE for finalizada,
  // ela some do quadro e é reagendada para o próximo dia previsto.
  async function applyStatus(task, newStatus) {
    if (newStatus === task.status) return

    if (newStatus === 'feito' && task.recorrente) {
      const next = getNextOccurrence(task.recorrencia_tipo, task.recorrencia_dias, getTodayStr())
      await supabase
        .from('tarefas')
        .update({ status: 'agendada', proxima_data: next, atualizado_em: new Date().toISOString() })
        .eq('id', task.id)
    } else {
      await supabase
        .from('tarefas')
        .update({ status: newStatus, atualizado_em: new Date().toISOString() })
        .eq('id', task.id)
    }
    onTasksChange()
  }

  async function handleSave(formData) {
    let payload = { ...formData }

    // Se a pessoa marcar recorrente e já salvar como "Finalizado", agenda a próxima
    if (formData.status === 'feito' && formData.recorrente) {
      payload = {
        ...formData,
        status: 'agendada',
        proxima_data: getNextOccurrence(formData.recorrencia_tipo, formData.recorrencia_dias, getTodayStr()),
      }
    }

    if (editingTask) {
      await supabase
        .from('tarefas')
        .update({ ...payload, atualizado_em: new Date().toISOString() })
        .eq('id', editingTask.id)
    } else {
      await supabase.from('tarefas').insert(payload)
    }
    setShowForm(false)
    setEditingTask(null)
    onTasksChange()
  }

  async function handleAddEmpresa({ nome, cor }) {
    await supabase.from('empresas').insert({ nome, cor })
    setShowEmpresa(false)
    onTasksChange()
  }

  async function handleDelete(task) {
    await supabase.from('tarefas').delete().eq('id', task.id)
    setDeleteConfirm(null)
    onTasksChange()
  }

  function openEdit(task) { setEditingTask(task); setShowForm(true) }
  function openNew() { setEditingTask(null); setShowForm(true) }

  /* ─── Drag & drop ─── */
  function onDragStart(e, task) {
    e.dataTransfer.setData('text/plain', String(task.id))
    e.dataTransfer.effectAllowed = 'move'
  }
  function onColumnDrop(e, status) {
    e.preventDefault()
    setDragOver(null)
    const id = Number(e.dataTransfer.getData('text/plain'))
    const task = tasks.find(t => t.id === id)
    if (task) applyStatus(task, status)
  }

  const totalActive = tasks.filter(t => t.status === 'a_fazer' || t.status === 'em_andamento').length
  const totalDone = tasks.filter(t => t.status === 'feito').length
  const totalAgendada = tasks.filter(t => t.status === 'agendada').length
  const hasAnyVisible = tasks.some(t => t.status !== 'agendada')

  return (
    <div className="gestor">
      <div className="gestor-header">
        <div>
          <h1 className="gestor-title">Gestor de Tarefas</h1>
          <p className="gestor-subtitle">
            {totalActive} em aberto · {totalDone} finalizadas
            {totalAgendada ? ` · ${totalAgendada} recorrente${totalAgendada > 1 ? 's' : ''} agendada${totalAgendada > 1 ? 's' : ''}` : ''}
          </p>
        </div>
        <div className="gestor-header-actions">
          <button className="btn btn-ghost" onClick={() => setShowEmpresa(true)}>
            + Empresa
          </button>
          <button className="btn btn-primary" onClick={openNew}>
            + Nova tarefa
          </button>
        </div>
      </div>

      <div className="gestor-search">
        <input
          className="form-input search-input"
          placeholder="🔍 Buscar tarefa..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <Filters
        empresas={empresas}
        filters={filters}
        onChange={setFilters}
      />

      {!hasAnyVisible ? (
        <div className="empty-state">
          <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>Nenhuma tarefa ainda</div>
          <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            Crie a primeira clicando em "+ Nova tarefa"
          </div>
        </div>
      ) : (
        <div className="kanban">
          {STATUS_COLUMNS.map(col => (
            <div
              key={col.value}
              className={`kanban-col ${dragOver === col.value ? 'drag-over' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragOver(col.value) }}
              onDragLeave={() => setDragOver(prev => (prev === col.value ? null : prev))}
              onDrop={e => onColumnDrop(e, col.value)}
            >
              <div className="kanban-col-header">
                <span className={`kanban-col-dot dot-${col.value}`} />
                <span className="kanban-col-title">{col.label}</span>
                <span className="kanban-col-count">{columns[col.value].length}</span>
              </div>
              <div className="kanban-col-body">
                {columns[col.value].length === 0 && (
                  <div className="kanban-empty">Solte uma tarefa aqui</div>
                )}
                {columns[col.value].map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={openEdit}
                    onDelete={setDeleteConfirm}
                    onStatusChange={applyStatus}
                    onDragStart={onDragStart}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <TaskForm
          task={editingTask}
          empresas={empresas}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingTask(null) }}
        />
      )}

      {showEmpresa && (
        <EmpresaForm
          onSave={handleAddEmpresa}
          onClose={() => setShowEmpresa(false)}
        />
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Excluir tarefa</span>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-soft)', fontSize: 14 }}>
                Tem certeza que deseja excluir <strong style={{ color: 'var(--text)' }}>"{deleteConfirm.titulo}"</strong>?
                Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
