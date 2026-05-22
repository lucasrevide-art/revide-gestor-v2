import React from 'react'
import { getGreeting } from '../../utils/helpers'

export default function Greeting({ onNavigate }) {
  const greeting = getGreeting()

  return (
    <div className="greeting-section">
      <img
        src="/logo-rv.png"
        alt="Revide"
        className="greeting-logo"
        onClick={() => onNavigate('dashboard')}
      />
      <h1 className="greeting-text">
        {greeting}, Lucas! 👋
      </h1>
      <p className="greeting-date">
        {new Date().toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </p>
    </div>
  )
}
