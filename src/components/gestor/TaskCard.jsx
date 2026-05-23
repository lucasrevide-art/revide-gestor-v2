import React from 'react'
import {
  formatDate,
  getPriorityLabel,
  getRecorrenciaLabel,
  isOverdue,
  isDueToday,
} from '../../utils/helpers'

export default function TaskCard({ task, onEdit, onDelete, onStatusChange, onDragStart }) {
  const empresa = task.empresas
  const overdue = isOverdue(task.data_entrega) && task.status !== 'feito'
  const dueToday = isDueToday(task.data_entrega) && task.status !== 'feito'

  const companyColor = empresa?.cor === '#000000' ? '#6366f1' : (empresa?.cor || '#3B82F6')

  function cycleStatus() {
    const cycle = { a_fazer: 'em_andamento', em_andamento: 'feito', feito: 'a_fazer' }
    onStatusChange(task, cycle[task.status])
  }

  return (
    <div
      className={`task-card ${task.status === 'feito' ? 'task-done' : ''} ${overdue ? 'task-overdue' : ''}`}
      style={{ borderLeftColor: companyColor }}
      draggable
      onDragStart={e => onDragStart && onDragStart(e, task)}
    >
      <div className="task-card-top">
        <div className="task-card-left">
          <button
            className={`task-status-btn status-${task.status}`}
            onClick={cycleStatus}
            title="Clique para avançar o status"
          >
            {task.status === 'feito' ? '✓' : task.status === 'em_andamento' ? '◐' : '○'}
          </button>
          <div className="task-card-info">
            <span className={`task-title ${task.status === 'feito' ? 'task-title-done' : ''}`}>
              {task.titulo}
            </span>
            {task.descricao && (
              <span className="task-description">{task.descricao}</span>
            )}
          </div>
        </div>

        <div className="task-card-actions">
          <button className="task-action-btn" onClick={() => onEdit(task)} title="Editar">
            ✎
          </button>
          <button
            className="task-action-btn task-action-delete"
            onClick={() => onDelete(task)}
            title="Excluir"
          >
            ×
          </button>
        </div>
      </div>

      <div className="task-card-meta">
        {empresa && (
          <span
            className="task-company-badge"
            style={{
              background: companyColor + '18',
              color: companyColor,
              borderColor: companyColor + '40'
            }}
          >
            {empresa.nome}
          </span>
        )}

        <span className={`badge badge-${task.prioridade}`}>
          {getPriorityLabel(task.prioridade)}
        </span>

        {task.recorrente && (
          <span className="task-recorrente" title="Tarefa recorrente">
            🔁 {getRecorrenciaLabel(task.recorrencia_tipo, task.recorrencia_dias)}
          </span>
        )}

        {task.data_entrega && (
          <span className={`task-due ${overdue ? 'due-overdue' : dueToday ? 'due-today' : ''}`}>
            {overdue ? '🔴' : dueToday ? '🟡' : '📅'} {formatDate(task.data_entrega)}
          </span>
        )}
      </div>
    </div>
  )
}
