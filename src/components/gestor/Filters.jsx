import React from 'react'

export default function Filters({ empresas, filters, onChange }) {
  function toggle(key, value) {
    onChange(prev => ({
      ...prev,
      [key]: prev[key] === value ? null : value
    }))
  }

  const prioridades = [
    { value: 'urgente', label: 'Urgente', color: 'var(--red)' },
    { value: 'normal', label: 'Normal', color: 'var(--blue)' },
    { value: 'pode_esperar', label: 'Pode esperar', color: 'var(--text-muted)' },
  ]

  const hasFilter = filters.empresa || filters.prioridade

  return (
    <div className="filters">
      <div className="filter-group">
        <span className="filter-label">Empresa</span>
        <div className="filter-chips">
          {empresas.map(emp => (
            <button
              key={emp.id}
              className={`filter-chip ${filters.empresa === emp.id ? 'active' : ''}`}
              onClick={() => toggle('empresa', emp.id)}
              style={filters.empresa === emp.id ? {
                background: emp.cor === '#000000' ? '#333' : emp.cor + '22',
                borderColor: emp.cor === '#000000' ? '#666' : emp.cor,
                color: emp.cor === '#000000' ? '#fff' : emp.cor,
              } : {}}
            >
              <span
                className="chip-dot"
                style={{
                  background: emp.cor === '#000000' ? '#888' : emp.cor
                }}
              />
              {emp.nome}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">Prioridade</span>
        <div className="filter-chips">
          {prioridades.map(p => (
            <button
              key={p.value}
              className={`filter-chip ${filters.prioridade === p.value ? 'active' : ''}`}
              onClick={() => toggle('prioridade', p.value)}
              style={filters.prioridade === p.value ? {
                background: p.color + '22',
                borderColor: p.color,
                color: p.color,
              } : {}}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {hasFilter && (
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => onChange({ empresa: null, prioridade: null })}
        >
          × Limpar filtros
        </button>
      )}
    </div>
  )
}
