// Traigo el efecto de React y el hook de tareas, dado que el componente raíz deja de llevar los datos escritos a mano
import { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import TaskSummary from './components/TaskSummary'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import useTareas from './hooks/useTareas'

function App() {
  // Obtengo la colección y los dos avisos que necesito para distinguir la carga del fallo
  const { tareas, cargando, error } = useTareas()

  // Recalculo la cantidad de pendientes y la escribo en el título de la pestaña del navegador.
  // El arreglo de dependencias es la colección dado que los filtros y los contadores llegan en la etapa N4
  useEffect(() => {
    const pendientes = tareas.filter((t) => !t.completada).length
    document.title = `TaskCampus (${pendientes} pendientes)`
  }, [tareas])

  return (
    <main className="app-container">
      {/* La cabecera sigue recibiendo sus textos por props desde este archivo */}
      <Header
        title="TaskCampus"
        description="Gestor de tareas académicas"
      />
      {/* El resumen recibe el largo real de la colección en lugar de una cantidad fija */}
      <TaskSummary total={tareas.length} />

      {/* Este aviso solo aparece mientras la petición viaja y desaparece al terminar */}
      {cargando && <p>Cargando tareas...</p>}

      {/* Aquí muestro el motivo del fallo en lugar de una lista vacía que haría pensar que no hay tareas */}
      {error && <p>Error al cargar las tareas: {error}</p>}

      {/* Le entrego la colección y los dos avisos aunque hoy no los use, de este modo la etapa H2 recorre los datos */}
      <TaskList
        title="Listado de tareas de hoy"
        tareas={tareas}
        cargando={cargando}
        error={error}
      />

      {/* El botón de alerta se retiró de aquí porque el laboratorio no admite alertas y H2 borra el archivo */}

      <Footer course="Aplicaciones y Tecnologías de la Web" />
    </main>
  )
}
// Exporto el componente principal que main.jsx monta dentro del documento
export default App
