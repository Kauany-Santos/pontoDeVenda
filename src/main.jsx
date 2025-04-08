import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PdvDashboard from './componentes/dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PdvDashboard />
  </StrictMode>,
)
