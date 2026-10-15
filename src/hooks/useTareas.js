// Importo el estado y el efecto de montaje desde React, que es lo único que este archivo necesita de la librería, porque el hook no es un componente y no tiene JSX
import { useState, useEffect } from 'react'
// Traigo el servicio que habla con el servidor, porque el hook nunca hace peticiones por su cuenta.
import { getTareas } from '../services/tareasService'

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

  // Devuelvo los tres estados para que el componente raíz los muestre sin conocer el servicio
  return { tareas, cargando, error }
}

// Exporto el hook con nombre para que App.jsx lo importe sin importar la ruta
export default useTareas
