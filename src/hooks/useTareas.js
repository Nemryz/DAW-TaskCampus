// Importo el estado y el efecto de montaje desde React, que es lo único que este archivo necesita de la librería, porque el hook no es un componente y no tiene JSX
import { useState, useEffect } from 'react'
// Traigo el servicio que habla con el servidor, porque el hook nunca hace peticiones por su cuenta.
import { getTareas, postTarea, putTarea, patchTarea, deleteTarea } from '../services/tareasService'

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

  // Guardo las identidades de las tareas cuya operación sigue en vuelo, para deshabilitar solo esos controles
  // Arranca con un conjunto vacío porque ninguna petición viaja en el momento de montar
  const [enOperacion, setEnOperacion] = useState(() => new Set())

  // Activo esta bandera mientras se crea una tarea, porque esa operación no tiene todavía una tarea que la identifique
  const [creando, setCreando] = useState(false)

  // Guardo el último mensaje de éxito, y el texto vacío significa que todavía no se confirmó nada
  const [exito, setExito] = useState('')

  // Este ayudante marca una identidad como ocupada creando un conjunto nuevo, porque el original ya está guardado
  const marcarEnOperacion = (idLocal) => {
    setEnOperacion((prev) => {
      const siguiente = new Set(prev)
      siguiente.add(idLocal)
      return siguiente
    })
  }

  // Este ayudante libera la identidad con el mismo criterio de crear un conjunto nuevo, para no mutar el anterior
  const liberarOperacion = (idLocal) => {
    setEnOperacion((prev) => {
      const siguiente = new Set(prev)
      siguiente.delete(idLocal)
      return siguiente
    })
  }

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
    // Borro el estado de error al empezar, para que un fallo anterior no oculte el formulario nuevo
    setError(null)
    setExito('')
    setCreando(true)

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

      // Aviso que la tarea quedó solo en esta sesión, porque el simulador no la conserva
      setExito('Tarea agregada. Queda solo en esta sesión porque la API de prueba no guarda los cambios.')
    } catch (err) {
      // Si la creación falla, la tarea no entra a la colección y el motivo queda visible para la persona
      setError(err.message)
    } finally {
      // Este bloque corre siempre y libera el formulario, haya éxito o error
      setCreando(false)
    }
  }

  // Esta operación cambia campos de una tarea, y primero averigua si esa tarea existe en el servidor
  const actualizarTarea = async (idLocal, cambios) => {
    const actual = tareas.find((t) => t.idLocal === idLocal)
    if (!actual) return

    // Borro los avisos anteriores y bloqueo los controles de esta tarea mientras viaja la petición
    setError(null)
    setExito('')
    marcarEnOperacion(idLocal)

    try {
      // Solo hay petición remota cuando la tarea nació en el servidor, porque lo local no existe allí
      if (actual.idRemoto !== null) await putTarea(actual.idRemoto, cambios)

      // Construyo un objeto nuevo para que React note el cambio y vuelva a dibujar la fila
      setTareas((prev) => prev.map((t) => (t.idLocal === idLocal ? { ...t, ...cambios } : t)))

      // Cuando la tarea es local aviso que el cambio no llegó al servidor, en lugar de fingir que sí
      setExito(
        actual.esLocal
          ? 'Cambio guardado solo en esta sesión, porque la API de prueba no guarda los cambios.'
          : 'Tarea actualizada.',
      )
    } catch (err) {
      // El estado no se toca cuando el servidor rechaza la operación, con lo cual no hay falso éxito
      setError(err.message)
    } finally {
      // El bloqueo se levanta pase lo que pase, porque si no la tarea quedaría congelada para siempre
      liberarOperacion(idLocal)
    }
  }

  // Esta operación cambia únicamente el título de una tarea, y por eso usa la actualización parcial
  const editarTitulo = async (idLocal, nuevoTitulo) => {
    const actual = tareas.find((t) => t.idLocal === idLocal)
    if (!actual) return

    setError(null)
    setExito('')
    marcarEnOperacion(idLocal)

    try {
      // La actualización parcial es la adecuada porque solo cambia el título y conserva el resto de los campos
      if (actual.idRemoto !== null) await patchTarea(actual.idRemoto, { title: nuevoTitulo })

      // Uso el título limpio que me entrega la pantalla y no el de la respuesta, por si el servidor lo reformatea
      setTareas((prev) =>
        prev.map((t) => (t.idLocal === idLocal ? { ...t, titulo: nuevoTitulo } : t)),
      )

      setExito(
        actual.esLocal
          ? 'Título guardado solo en esta sesión, porque la API de prueba no guarda los cambios.'
          : 'Título actualizado.',
      )
    } catch (err) {
      // Si el servidor rechaza la edición, el título anterior permanece intacto en la colección
      setError(err.message)
    } finally {
      liberarOperacion(idLocal)
    }
  }

  // Esta operación borra una tarea y primero pregunta al servidor si esa tarea existía allí
  const eliminarTarea = async (idLocal) => {
    const actual = tareas.find((t) => t.idLocal === idLocal)
    if (!actual) return

    setError(null)
    setExito('')
    marcarEnOperacion(idLocal)

    try {
      // El borrado remoto solo procede si la tarea tiene identidad de servidor
      if (actual.idRemoto !== null) await deleteTarea(actual.idRemoto)

      // El filtro devuelve una colección nueva que ya no contiene la tarea señalada
      setTareas((prev) => prev.filter((t) => t.idLocal !== idLocal))
      setExito('Tarea eliminada.')
    } catch (err) {
      // Si el servidor rechaza el borrado, la tarea permanece en la colección y el motivo queda visible
      setError(err.message)
    } finally {
      liberarOperacion(idLocal)
    }
  }

  // Devuelvo los estados de lectura, los de escritura y las cuatro operaciones, que la aplicación conecta en la etapa N4
  return {
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
  }
}

// Exporto el hook con nombre para que App.jsx lo importe sin importar la ruta
export default useTareas
