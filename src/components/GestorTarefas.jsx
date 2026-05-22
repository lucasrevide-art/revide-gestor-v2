import React, { useState, useMemo } from 'react'
import { supabase } from '../utils/supabaseClient'
import TaskCard from './gestor/TaskCard'
import TaskForm from './gestor/TaskForm'
import Filters from './gestor/Filters'
import '../styles/GestorTarefas.css'

export default function GestorTarefas({ tasks, empresas, onTasksChange }) {
  const [filters, setFilters] = useState({ empresa: null, prioridade: null, status: null })
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return tasks.filter(t => {
      if (filters.empresa && t.empresa_id !== filters.empresa) return false
      if (filters.prioridade && t.prioridade !== filters.prioridade) return false
      if (filters.status && t.status !== filters.status) return false
      if (search && !t.titulo.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [tasks, filters, search])

  const grouped = useMemo(() => {
    const order = { urgente: 0, normal: 1, pode_esperar: 2 }
    const active = filtered.filter(t => t.status !== 'feito')
      .sort((a, b) => order[a.prioridade] - order[b.prioridade])
    const done = filtered.filter(t => t.status === 'feito')
    return { active, done }
  }, [filtered])

  async function handleSave(formData) {
    if (editingTask) {
      await supabase
        .from('tarefas')
        .update({ ...formData, atualizado_em: new Date().toISOString() })
        .eq('id', editingTask.id)
    } else {
      await supabase.from('tarefas').insert(formData)
    }
    setShowForm(false)
    setEditingTask(null)
    onTasksChange()
  }

  async function handleStatusChange(task, newStatus) {
    await supabase
      .from('tarefas')
      .update({ status: newStatus, atualizado_em: new Date().toISOString() })
      .eq('id', task.id)
    onTasksChange()
  }

  async function handleDelete(task) {
    await supabase.from('tarefas').delete().eq('id', task.id)
    setDeleteConfirm(null)
    onTasksChange()
  }

  function openEdit(task) {
    setEditingTask(task)
    setShowForm(true)
  }

  function openNew() {
    setEditingTask(null)
    setShowForm(true)
  }

  const totalActive = tasks.filter(t => t.status !== 'feito').length
  const totalDone = tasks.filter(t => t.status === 'feito').length

  return (
    <div className="gestor">
      <div className="gestor-header">
        <div>
          <h1 className="gestor-title">Gestor de Tarefas</h1>
          <p className="gestor-subtitle">
            {totalActive} em aberto · {totalDone} concluídas
          </p>
        </div>
        <button className="btn btn-primary" onClick={openNew}>
          + Nova tarefa
        </button>
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

      <div className="task-list">
        {filtered.length === 0 && (
          <div className="empty-state">
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>Nenhuma tarefa encontrada</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
              {tasks.length === 0
                ? 'Crie sua primeira tarefa clicando em "+ Nova tarefa"'
                : 'Tente ajustar os filtros'}
            </div>
          </div>
        )}

        {grouped.active.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={openEdit}
            onDelete={setDeleteConfirm}
            onStatusChange={handleStatusChange}
          />
        ))}

        {grouped.done.length > 0 && grouped.active.length > 0 && (
          <div className="done-divider">
            <span>Concluídas ({grouped.done.length})</span>
          </div>
        )}

        {grouped.done.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={openEdit}
            onDelete={setDeleteConfirm}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          empresas={empresas}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingTask(null) }}
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
