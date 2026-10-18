// Traigo el estado de React y el gancho de tareas, porque el componente raíz coordina y no calcula
import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import Modal from './components/Modal'
import useTareas from './hooks/useTareas'
import ResumenView from './views/ResumenView'
import TareasView from './views/TareasView'
import NuevaTareaView from './views/NuevaTareaView'

function App() {
  // El gancho entrega los datos y las operaciones, y este archivo decide a quién le toca cada una
  const {
    tareas,
    cargando,
    error,
    exito,
    creando,
    enOperacion,
    crearTarea,
    actualizarTarea,
    editarTitulo,
    eliminarTarea,
  } = useTareas()

  // Guardo el filtro de estado aquí y no dentro de la vista, porque la vista se desmonta al cambiar
  const [filtro, setFiltro] = useState('todas')

  // Guardo el texto de búsqueda por la misma razón que el filtro, para que sobreviva al cambio de vista
  const [busqueda, setBusqueda] = useState('')

  // Guardo la vista activa con uno de los tres valores que reconoce el enunciado
  const [vistaActiva, setVistaActiva] = useState('resumen')

  // Guardo la identidad de la tarea que la persona pidió borrar, y nulo significa que no hay ninguna
  const [tareaAEliminar, setTareaAEliminar] = useState(null)

  // Derivo el total y los contadores desde la colección, porque el resumen no debe guardar su propia copia
  const completadas = tareas.filter((t) => t.completada).length
  const pendientes = tareas.length - completadas

  // Derivo la lista visible combinando el filtro de estado con el texto de búsqueda
  // La búsqueda se lleva a minúsculas en ambos lados para que no distinga mayúsculas de minúsculas
  const tareasFiltradas = tareas.filter((t) => {
    const coincideEstado =
      filtro === 'todas' ||
      (filtro === 'pendientes' && !t.completada) ||
      (filtro === 'completadas' && t.completada)
    const coincideTexto = t.titulo.toLowerCase().includes(busqueda.trim().toLowerCase())
    return coincideEstado && coincideTexto
  })

  // La cantidad mostrada sale de la lista ya filtrada y por eso refleja los dos criterios juntos
  const mostradas = tareasFiltradas.length
  const filtroActual = filtro

  // Escribo la cantidad de pendientes en el título de la pestaña usando el valor ya derivado
  useEffect(() => {
    document.title = `TaskCampus (${pendientes} pendientes)`
  }, [pendientes])

  // Este manejador invierte la condición de la tarea que la persona alternó desde la insignia o el botón
  const handleAlternar = (idLocal, completadaActual) => {
    actualizarTarea(idLocal, { completada: !completadaActual })
  }

  // Este manejador abre la ventana de confirmación guardando solo la identidad, sin quitar la tarea todavía
  const handleSolicitarBorrado = (idLocal) => {
    setTareaAEliminar(idLocal)
  }

  // Confirmar borra de verdad y cerrar la ventana, porque cancelar nunca llega hasta aquí
  const handleConfirmarBorrado = () => {
    if (tareaAEliminar !== null) eliminarTarea(tareaAEliminar)
    setTareaAEliminar(null)
  }

  // Cancelar solo cierra la ventana y deja la tarea intacta en la colección
  const handleCancelarBorrado = () => {
    setTareaAEliminar(null)
  }

  // Busco el título original para que el mensaje de la ventana hable de la tarea correcta y no de su posición
  const tareaAEliminarInfo = tareas.find((t) => t.idLocal === tareaAEliminar)

  return (
    <main className="app-container">
      {/* La cabecera y la navegación quedan siempre visibles, porque el enunciado las exige en las tres vistas */}
      <Header title="TaskCampus" description="Gestor de tareas académicas" />
      <Navigation vistaActiva={vistaActiva} onCambiarVista={setVistaActiva} />

      {/* Los avisos de error y de éxito viven aquí porque son comunes a las tres vistas */}
      {error && <p className="estado-error">Error: {error}</p>}
      {exito && <p className="estado-exito">{exito}</p>}

      {/* Una sola vista se monta a la vez y las tareas viven en este archivo, no dentro de cada vista */}
      {vistaActiva === 'resumen' && (
        <ResumenView
          total={tareas.length}
          completadas={completadas}
          pendientes={pendientes}
          mostradas={mostradas}
          filtroActual={filtroActual}
        />
      )}

      {vistaActiva === 'tareas' && (
        <TareasView
          title="Listado de tareas"
          tareas={tareasFiltradas}
          cargando={cargando}
          // Entrego el error como nulo porque este archivo ya lo muestra arriba, y la lista se queda visible
          // Si una escritura falla, el aviso explica el fallo y las tareas siguen a la vista para reintentar
          error={null}
          filtro={filtro}
          onCambiarFiltro={setFiltro}
          busqueda={busqueda}
          onCambiarBusqueda={setBusqueda}
          onToggle={handleAlternar}
          onEditar={editarTitulo}
          onEliminar={handleSolicitarBorrado}
          enOperacion={enOperacion}
        />
      )}

      {vistaActiva === 'nueva' && (
        // Entrego el error y el éxito como nulos porque este archivo ya los muestra arriba con el matiz del aviso
        // El formulario conserva su propia validación local, que nace en la pantalla y no viene del servidor
        <NuevaTareaView onAgregar={crearTarea} creando={creando} error={null} exito={false} />
      )}

      {/* La ventana se monta una sola vez fuera de las vistas, porque el borrado se pide desde la vista de tareas */}
      <Modal
        visible={tareaAEliminar !== null}
        mensaje={
          tareaAEliminarInfo
            ? `¿Seguro que deseas eliminar la tarea "${tareaAEliminarInfo.titulo}"?`
            : '¿Seguro que deseas eliminar esta tarea?'
        }
        onConfirmar={handleConfirmarBorrado}
        onCancelar={handleCancelarBorrado}
      />

      <Footer course="Aplicaciones y Tecnologías de la Web" />
    </main>
  )
}

// Exporto el componente principal que main.jsx monta dentro del documento
export default App