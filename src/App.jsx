import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import GestorTarefas from './components/GestorTarefas'
import { supabase } from './utils/supabaseClient'

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [tasks, setTasks] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      const [tarefasRes, empresasRes] = await Promise.all([
        supabase
          .from('tarefas')
          .select('*, empresas(*)')
          .order('criado_em', { ascending: false }),
        supabase.from('empresas').select('*').order('id')
      ])
      setTasks(tarefasRes.data || [])
      setEmpresas(empresasRes.data || [])
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
