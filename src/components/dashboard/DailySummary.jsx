import React from 'react'
import { isOverdue, isDueToday, isDueSoon, formatDate } from '../../utils/helpers'

export default function DailySummary({ tasks }) {
  const active = tasks.filter(t => t.status !== 'feito')
  const done = tasks.filter(t => t.status === 'feito')

  const overdue = active.filter(t => isOverdue(t.data_entrega))
  const dueToday = active.filter(t => isDueToday(t.data_entrega))
  const dueSoon = active.filter(t => isDueSoon(t.data_entrega))

  const hasAlerts = overdue.length + dueToday.length + dueSoon.length > 0

  return (
    <div className="summary-section">
      <div className="summary-stats">
        <div className="stat-item">
          <span className="stat-value">{tasks.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-value" style={{ color: 'var(--yellow)' }}>{active.length}</span>
          <span className="stat-label">Em aberto</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-value" style={{ color: 'var(--green)' }}>{done.length}</span>
          <span className="stat-label">Concluídas</span>
        </div>
      </div>

      {hasAlerts && (
        <div className="alerts-list">
          {overdue.map(t => (
            <div key={t.id} className="alert-item alert-red">
              <span className="alert-icon">🔴</span>
              <span className="alert-text">
                <strong>{t.titulo}</strong> — venceu em {formatDate(t.data_entrega)}
              </span>
            </div>
          ))}
          {dueToday.map(t => (
            <div key={t.id} className="alert-item alert-yellow">
              <span className="alert-icon">🟡</span>
              <span className="alert-text">
                <strong>{t.titulo}</strong> — vence hoje
              </span>
            </div>
          ))}
          {dueSoon.map(t => (
            <div key={t.id} className="alert-item alert-blue">
              <span className="alert-icon">🔵</span>
              <span className="alert-text">
                <strong>{t.titulo}</strong> — vence em breve ({formatDate(t.data_entrega)})
              </span>
            </div>
          ))}
        </div>
      )}

      {!hasAlerts && active.length > 0 && (
        <div className="no-alerts">
          ✅ Nenhum prazo vencido ou urgente — continue assim!
        </div>
      )}
    </div>
  )
}
