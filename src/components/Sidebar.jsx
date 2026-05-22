import React from 'react'

const NAV_ITEMS = [
  { id: 'dashboard', icon: '⚡', label: 'Mission Control' },
  { id: 'gestor', icon: '✅', label: 'Gestão' },
]

const NAV_COMING = [
  { id: 'financeiro', icon: '💰', label: 'Financeiro' },
  { id: 'conteudo', icon: '📝', label: 'Conteúdo' },
  { id: 'estruturacao', icon: '🏗️', label: 'Estruturação' },
  { id: 'documentos', icon: '📄', label: 'Documentos' },
  { id: 'criacao', icon: '🎨', label: 'Criação' },
]

export default function Sidebar({ currentView, onNavigate, isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <img
          src="/logo-rv.png"
          alt="Revide"
          className="sidebar-logo-img"
          onClick={() => onNavigate('dashboard')}
        />
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            <span className="nav-dot" />
          </button>
        ))}

        <div className="nav-section-label" style={{ marginTop: 12 }}>Em breve</div>

        {NAV_COMING.map(item => (
          <button
            key={item.id}
            className="nav-item"
            onClick={() => onNavigate(item.id)}
            style={{ opacity: 0.45 }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            <span className="nav-badge">breve</span>
          </button>
        ))}
      </nav>

      <div style={{
        padding: '16px 16px 20px',
        borderTop: '1px solid var(--border)',
        fontSize: 11,
        color: 'var(--text-muted)',
        letterSpacing: '0.02em'
      }}>
        Revide · Gestão v1.0
      </div>
    </aside>
  )
}
