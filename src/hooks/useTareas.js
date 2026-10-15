// Importo el estado y el efecto de montaje desde React, que es lo único que este archivo necesita de la librería, porque el hook no es un componente y no tiene JSX
import { useState, useEffect } from 'react'
// Traigo el servicio que habla con el servidor, porque el hook nunca hace peticiones por su cuenta.
import { getTareas, postTarea, putTarea, deleteTarea } from '../services/tareasService'

// Este hook encierra todo el estado de las tareas y es el único punto que se comunica con el servicio de forma directa
// El componente raíz solo recibe los datos ya traducidos y los avisos de carga y fallo, sin conocer el servicio ni la traducción
const useTareas = () => {
  // Guardo la colección que se dibuja en pantalla y arranca vacía porque todavía no hay respuesta clara del servidor
  const [tareas, setTareas] = useState([])

  // Activo esta bandera desde el inicio porque la petición sale apenas se monta el componente y se apaga cuando llega la respuesta, haya éxito o error
  const [cargando, setCargando] = useState(true)

  // Almaceno el motivo del fallo y el valor nulo significa que todavía no hubo ninguno
  // Sin este estado el usuario vería una pantalla vacía y concluiría que no hay tareas
  const [error, setError] = useState(null)

  // El arreglo vacío le indica a React que este efecto corre una sola vez, al montar el componente
  useEffect(() => {
    // Un efecto no puede ser asíncrono, así que defino la operación dentro y la invoco al terminar
    const cargarTareas = async () => {
      try {
        // Envuelvo la llamada y la traducción juntas para que cualquier fallo caiga en el mismo bloque
        // Y pido solo las primeras diez tareas porque así lo exige el primer requisito funcional
        const datos = await getTareas(10)

        // El servicio habla inglés y la aplicación habla español, por eso traduzco los nombres aquí.
        const tareasAdaptadas = datos.map((item) => ({
          // Guardo la identidad local como texto para que nunca choque con las que cree la aplicación
          idLocal: String(item.id),
          // Conservo aparte la identidad del servidor porque las operaciones posteriores la necesitan
          idRemoto: item.id,
          titulo: item.title,
          completada: item.completed,
          // Estas tareas vienen del servidor, así que se pueden actualizar contra él
          esLocal: false,
        }))

        // Guardo la colección ya traducida en el estado para que la interfaz la pueda leer
        setTareas(tareasAdaptadas)
      } catch (err) {
        // Aquí caen tanto el fallo de red como el error que el servicio lanza al revisar la respuesta
        setError(err.message)
      } finally {
        // Este bloque corre siempre y apaga el indicador de carga haya éxito o error
        setCargando(false)
      }
    }

    // Invoco la función que acabo de definir, que es el patrón estándar cuando el efecto es asíncrono
    cargarTareas()
  }, [])

  // Esta operación crea la tarea y la coloca al principio para que la persona la vea de inmediato
  const crearTarea = async (titulo) => {
    try {
      // Envío la creación al servidor y espero su respuesta, porque validar el éxito es obligatorio
      // No conservo lo que responde, ya que el simulador devuelve siempre la misma identidad y no representa nada real
      await postTarea(titulo)

      // Armo el objeto con la misma forma que usa la lectura, para que la colección sea homogénea
      const tareaLocal = {
        // La identidad local se genera con la hora y lleva prefijo para no chocar con la del servidor
        idLocal: `local-${Date.now()}`,
        // Dejo la identidad remota en nulo porque el simulador devuelve siempre la misma y no representa nada real
        idRemoto: null,
        // Conservo el título que escribió la persona porque el servidor reformatea el texto que recibe
        titulo,
        completada: false,
        // Marco la tarea como local porque el simulador no la guarda de verdad entre llamadas
        esLocal: true,
      }

      // Uso la forma funcional para no depender de una copia antigua de la colección
      setTareas((prev) => [tareaLocal, ...prev])
      return tareaLocal
    } catch (err) {
      // Si la creación falla, la tarea no entra a la colección y el motivo queda visible para la persona
      setError(err.message)
    }
  }

  // Esta operación cambia campos de una tarea, y primero averigua si esa tarea existe en el servidor
  const actualizarTarea = async (idLocal, cambios) => {
    try {
      const actual = tareas.find((t) => t.idLocal === idLocal)
      if (!actual) return

      // Solo hay petición remota cuando la tarea nació en el servidor, porque lo local no existe allí
      if (actual.idRemoto !== null) await putTarea(actual.idRemoto, cambios)

      // Construyo un objeto nuevo para que React note el cambio y vuelva a dibujar la fila
      setTareas((prev) => prev.map((t) => (t.idLocal === idLocal ? { ...t, ...cambios } : t)))
    } catch (err) {
      // El estado no se toca cuando el servidor rechaza la operación, con lo cual no hay falso éxito
      setError(err.message)
    }
  }

  // Esta operación borra una tarea y primero pregunta al servidor si esa tarea existía allí
  const eliminarTarea = async (idLocal) => {
    try {
      const actual = tareas.find((t) => t.idLocal === idLocal)
      if (!actual) return

      // El borrado remoto solo procede si la tarea tiene identidad de servidor
      if (actual.idRemoto !== null) await deleteTarea(actual.idRemoto)

      // El filtro devuelve una colección nueva que ya no contiene la tarea señalada
      setTareas((prev) => prev.filter((t) => t.idLocal !== idLocal))
    } catch (err) {
      // Si el servidor rechaza el borrado, la tarea permanece en la colección y el motivo queda visible
      setError(err.message)
    }
  }

  // Devuelvo los estados de lectura junto con las tres operaciones, que la aplicación conecta en la etapa H3
  return { tareas, cargando, error, crearTarea, actualizarTarea, eliminarTarea }
}

// Exporto el hook con nombre para que App.jsx lo importe sin importar la ruta
export default useTareas
