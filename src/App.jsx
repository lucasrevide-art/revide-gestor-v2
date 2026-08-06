import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import GestorTarefas from './components/GestorTarefas'
import { db } from './utils/localDb'
import { getTodayStr } from './utils/helpers'
import { getTheme, applyTheme } from './utils/theme'

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [tasks, setTasks] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState(getTheme)

  useEffect(() => {
    loadData()
  }, [])

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    applyTheme(next)
    setTheme(next)
  }

  function loadData() {
    setLoading(true)
    try {
      let tarefas = db.tarefas.list()
      const empresas = db.empresas.list()

      // Desbloqueia tarefas recorrentes "agendadas" cujo dia previsto já chegou:
      // elas voltam para "A fazer" no dia certo.
      const hoje = getTodayStr()
      const aDesbloquear = tarefas.filter(
        t => t.recorrente && t.status === 'agendada' && t.proxima_data && t.proxima_data <= hoje
      )

      if (aDesbloquear.length) {
        aDesbloquear.forEach(t =>
          db.tarefas.update(t.id, {
            status: 'a_fazer',
            data_entrega: t.proxima_data,
            proxima_data: null,
            atualizado_em: new Date().toISOString(),
          })
        )
        tarefas = db.tarefas.list()
      }

      setTasks(tarefas)
      setEmpresas(empresas)
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
    } finally {
      setLoading(false)
    }
  }

  function closeSidebar() {
    setSidebarOpen(false)
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading-screen">
          <div className="loading-spinner" />
          <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Carregando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>

      <div
        className={`sidebar-overlay ${sidebarOpen ? '' : 'hidden'}`}
        onClick={closeSidebar}
      />

      <Sidebar
        currentView={currentView}
        onNavigate={(view) => { setCurrentView(view); closeSidebar() }}
        isOpen={sidebarOpen}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="main-content">
        {currentView === 'dashboard' ? (
          <Dashboard
            tasks={tasks}
            empresas={empresas}
            onNavigate={setCurrentView}
            onRefresh={loadData}
          />
        ) : currentView === 'gestor' ? (
          <GestorTarefas
            tasks={tasks}
            empresas={empresas}
            onTasksChange={loadData}
          />
        ) : (
          <ComingSoon view={currentView} />
        )}
      </main>
    </div>
  )
}

function ComingSoon({ view }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: 12,
      color: 'var(--text-muted)'
    }}>
      <div style={{ fontSize: 40 }}>🚧</div>
      <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--text)' }}>Em breve</div>
      <div style={{ fontSize: 13 }}>Esta seção está sendo construída.</div>
    </div>
  )
}
