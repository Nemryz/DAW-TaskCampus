import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Entrego el contenedor vacío del documento a React y le indico qué componente quiero dibujar
// Envuelvo la aplicación en StrictMode para que React me avise de malas prácticas durante el desarrollo
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
