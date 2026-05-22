import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { msToTime, formatMinutes } from '../../utils/helpers'

const TIME_OPTIONS = [
  { label: '10 min', value: 10 },
  { label: '20 min', value: 20 },
  { label: '30 min', value: 30 },
  { label: '1 hora', value: 60 },
  { label: '2 horas', value: 120 },
]

export default function QuickReminders() {
  const [reminders, setReminders] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newTime, setNewTime] = useState(30)
  const [showForm, setShowForm] = useState(false)
  const [ticks, setTicks] = useState(0)
  const timersRef = useRef({})

  useEffect(() => {
    loadReminders()
    const interval = setInterval(() => setTicks(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  async function loadReminders() {
    const { data } = await supabase
      .from('lembretes')
      .select('*')
      .eq('disparado', false)
      .order('fire_at')
    setReminders(data || [])
  }

  async function addReminder() {
    if (!newTitle.trim()) return
    const fireAt = new Date(Date.now() + newTime * 60 * 1000).toISOString()

    const { data } = await supabase.from('lembretes').insert({
      titulo: newTitle.trim(),
      tempo_minutos: newTime,
      fire_at: fireAt,
      disparado: false
    }).select().single()

    if (data) {
      setReminders(prev => [...prev, data].sort((a, b) => new Date(a.fire_at) - new Date(b.fire_at)))
    }
    setNewTitle('')
    setShowForm(false)
  }

  async function dismissReminder(id) {
    await supabase.from('lembretes').update({ disparado: true }).eq('id', id)
    setReminders(prev => prev.filter(r => r.id !== id))
  }

  function getRemainingMs(fireAt) {
    return new Date(fireAt).getTime() - Date.now()
  }

  useEffect(() => {
    reminders.forEach(r => {
      const ms = getRemainingMs(r.fire_at)
      if (ms <= 0 && !timersRef.current[r.id]) {
        timersRef.current[r.id] = true
        fireNotification(r)
        dismissReminder(r.id)
      }
    })
  }, [ticks, reminders])

  function fireNotification(reminder) {
    if (Notification.permission === 'granted') {
      new Notification('⏰ Revide — Lembrete', {
        body: reminder.titulo,
        icon: '/favicon.svg'
      })
    }
  }

  async function requestNotifPermission() {
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission()
    }
  }

  return (
    <div className="reminders-section">
      <div className="section-header">
        <span className="section-title">⏰ Lembretes</span>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => { setShowForm(!showForm); requestNotifPermission() }}
        >
          +
        </button>
      </div>

      {showForm && (
        <div className="reminder-form">
          <input
            className="form-input"
            placeholder="O que devo lembrar?"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addReminder()}
            autoFocus
          />
          <div className="time-options">
            {TIME_OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`time-opt ${newTime === opt.value ? 'active' : ''}`}
                onClick={() => setNewTime(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={addReminder}>
              Criar lembrete
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowForm(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {reminders.length === 0 && !showForm && (
        <div className="empty-reminders">Nenhum lembrete ativo.</div>
      )}

      <div className="reminders-list">
        {reminders.map(r => {
          const ms = getRemainingMs(r.fire_at)
          const expired = ms <= 0
          return (
            <div key={r.id} className={`reminder-item ${expired ? 'reminder-expired' : ''}`}>
              <div className="reminder-info">
                <span className="reminder-title">{r.titulo}</span>
                <span className="reminder-timer">
                  {expired ? '⏰ Disparado!' : msToTime(ms)}
                </span>
              </div>
              <button
                className="reminder-dismiss"
                onClick={() => dismissReminder(r.id)}
                title="Dispensar"
              >
                ×
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
