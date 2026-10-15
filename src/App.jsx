// Este es el componente raíz y por ahora solo compone piezas porque todavía no usa estado de React
import './App.css'
import Header from './components/Header'
import TaskSummary from './components/TaskSummary'
import TaskList from './components/TaskList'
import ActionButton from './components/ActionButton'
import Footer from './components/Footer'

function App() {
  // Esta función solo abre una alerta y la etapa N1 la retira porque el laboratorio no admite alertas
  function reviewTasks() {
    alert('Tienes 3 tareas pendientes por revisar')
  }
  return (
    <main className="app-container">
      {/* La cabecera recibe sus textos por props y por eso este archivo no repite el nombre del proyecto */}
      <Header
        title="TaskCampus"
        description="Gestor de tareas académicas"
      />
      {/* La cantidad visible está escrita a mano y N1 la reemplaza por el largo real de la lista */}
      <TaskSummary total={3} />
      {/* El listado recibe su título desde aquí, cuando antes lo tenía escrito dentro de su propio archivo */}
      <TaskList title="Listado de tareas de hoy" />
      <ActionButton onReview={reviewTasks} />
      <Footer course="Aplicaciones y Tecnologías de la Web" />
    </main>
  )
}
// Exporto el componente principal que main.jsx monta dentro del documento
export default App
