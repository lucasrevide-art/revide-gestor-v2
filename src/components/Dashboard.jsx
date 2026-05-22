import React, { useState } from 'react'
import Greeting from './dashboard/Greeting'
import MotivationalMessage from './dashboard/MotivationalMessage'
import DailySummary from './dashboard/DailySummary'
import DailyObjectives from './dashboard/DailyObjectives'
import QuickReminders from './dashboard/QuickReminders'
import ProgressBar from './dashboard/ProgressBar'
import '../styles/Dashboard.css'

export default function Dashboard({ tasks, empresas, onNavigate, onRefresh }) {
  const [objectives, setObjectives] = useState([])

  const total = tasks.length
  const done = tasks.filter(t => t.status === 'feito').length
  const progress = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <Greeting onNavigate={onNavigate} />
        <button className="refresh-btn" onClick={onRefresh} title="Atualizar dados">
          ↻ Atualizar
        </button>
      </div>

      <MotivationalMessage
        tasks={tasks}
        objectives={objectives}
        progress={progress}
      />

      <div className="dashboard-grid">
        <div className="dashboard-col-main">
          <ProgressBar tasks={tasks} empresas={empresas} />
          <DailySummary tasks={tasks} />
          <DailyObjectives
            tasks={tasks}
            onObjectivesChange={setObjectives}
          />
        </div>

        <div className="dashboard-col-side">
          <QuickReminders />

          <div className="goto-gestor-card">
            <div className="goto-icon">✅</div>
            <div>
              <div className="goto-title">Gestor de Tarefas</div>
              <div className="goto-sub">Criar, editar e filtrar tarefas</div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('gestor')}
            >
              Abrir →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
