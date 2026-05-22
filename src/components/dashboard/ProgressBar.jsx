import React from 'react'

export default function ProgressBar({ tasks, empresas }) {
  const total = tasks.length
  const done = tasks.filter(t => t.status === 'feito').length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  const byCompany = empresas.map(emp => {
    const empTasks = tasks.filter(t => t.empresa_id === emp.id)
    const empDone = empTasks.filter(t => t.status === 'feito').length
    const empPercent = empTasks.length === 0 ? 0 : Math.round((empDone / empTasks.length) * 100)
    return { ...emp, total: empTasks.length, done: empDone, percent: empPercent }
  }).filter(e => e.total > 0)

  return (
    <div className="progress-section">
      <div className="progress-header">
        <span className="section-title">Progresso do dia</span>
        <span className="progress-percent">{percent}%</span>
      </div>

      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percent}%` }}
        />
      </div>

      {byCompany.length > 0 && (
        <div className="company-breakdown">
          {byCompany.map(emp => (
            <div key={emp.id} className="company-progress-item">
              <div className="company-progress-header">
                <div className="company-dot-name">
                  <span
                    className="company-color-dot"
                    style={{
                      background: emp.cor === '#000000' ? '#fff' : emp.cor,
                      border: emp.cor === '#000000' ? '1px solid #555' : 'none'
                    }}
                  />
                  <span className="company-name-small">{emp.nome}</span>
                </div>
                <span className="company-progress-text">
                  {emp.done}/{emp.total} · {emp.percent}%
                </span>
              </div>
              <div className="company-bar-track">
                <div
                  className="company-bar-fill"
                  style={{
                    width: `${emp.percent}%`,
                    background: emp.cor === '#000000' ? '#6b7280' : emp.cor
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
