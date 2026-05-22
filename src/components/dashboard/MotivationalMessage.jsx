import React, { useState, useEffect } from 'react'
import { generateMotivationalMessage } from '../../utils/claudeClient'
import { getGreeting } from '../../utils/helpers'

export default function MotivationalMessage({ tasks, objectives, progress }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const completedTasks = tasks.filter(t => t.status === 'feito').length
    const totalTasks = tasks.filter(t => t.status !== 'feito').length

    generateMotivationalMessage({
      greeting: getGreeting(),
      totalTasks,
      completedTasks,
      objectives,
      progress
    }).then(msg => {
      if (!cancelled) {
        setMessage(msg)
        setLoading(false)
      }
    })

    return () => { cancelled = true }
  }, [])

  function handleRefresh() {
    const today = new Date().toISOString().split('T')[0]
    localStorage.removeItem('rv_msg_' + today)
    setLoading(true)
    const completedTasks = tasks.filter(t => t.status === 'feito').length
    const totalTasks = tasks.filter(t => t.status !== 'feito').length

    generateMotivationalMessage({
      greeting: getGreeting(),
      totalTasks,
      completedTasks,
      objectives,
      progress
    }).then(msg => {
      setMessage(msg)
      setLoading(false)
    })
  }

  return (
    <div className="motivational-card">
      {loading ? (
        <div className="motivational-loading">
          <div className="loading-spinner" style={{ width: 20, height: 20 }} />
          <span>Gerando mensagem do dia...</span>
        </div>
      ) : (
        <>
          <p className="motivational-text">{message}</p>
          <button
            className="motivational-refresh"
            onClick={handleRefresh}
            title="Nova mensagem"
          >
            ↻
          </button>
        </>
      )}
    </div>
  )
}
