import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Simulador from './simulador/Simulador.jsx'
import './App.css'

const isSimulador = window.location.pathname.startsWith('/simulador')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isSimulador ? <Simulador /> : <App />}
  </React.StrictMode>
)
