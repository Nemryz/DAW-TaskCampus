// Guardo la dirección del servicio en una constante para no repetirla y poder cambiarla en un solo lugar.
const API_URL = 'https://jsonplaceholder.typicode.com/todos'

// Este archivo no importa nada a propósito, porque así el script de pruebas podrá cargarlo fuera del navegador
// Esta función pide las tareas y devuelve la respuesta sin traducirla, ya que el servicio solo habla con el servidor
// El servicio es quien valida la respuesta, porque el cliente nunca puede confiar en lo que devuelve el servidor
export async function getTareas(limite = 10) {
  // El límite llega con valor por defecto porque la aplicación solo necesita las primeras.
  // Acá interrogamos el servicio con un parámetro de consulta porque el simulador entiende ese filtro
  const res = await fetch(`${API_URL}?_limit=${limite}`)

  // La propiedad de éxito solo vale en las respuestas correctas, por eso lanzo el error a mano
  // Si no se revisara, un fallo del servidor se confundiría con una lista vacía y el usuario creería que no hay tareas
  if (!res.ok) throw new Error(`Error al obtener tareas (HTTP ${res.status})`)

  // Devuelvo el texto convertido en objetos porque el hook necesita objetos y no cadenas
  return res.json()
}

// Esta función crea una tarea en el servidor y devuelve lo que el simulador responde
// El cuerpo viaja con los nombres que espera el servidor, porque el servicio es quien habla su idioma
export async function postTarea(titulo) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: titulo, completed: false, userId: 1 }),
  })

  // Aplico la misma validación de la lectura, porque un fallo al crear también debe llegar a la interfaz
  if (!res.ok) throw new Error(`Error al crear la tarea (HTTP ${res.status})`)

  return res.json()
}

// Esta función reemplaza por completo una tarea existente y por eso necesita su identificador remoto
// Los cambios viajan tal cual porque quien llama decide qué campos quiere modificar
export async function putTarea(idRemoto, cambios) {
  const res = await fetch(`${API_URL}/${idRemoto}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cambios),
  })

  // Si el servidor rechaza la operación, el error sube y el estado local no se toca
  if (!res.ok) throw new Error(`Error al actualizar la tarea (HTTP ${res.status})`)

  return res.json()
}

// Esta función borra una tarea del servidor y no necesita cuerpo porque el servidor no devuelve contenido
export async function deleteTarea(idRemoto) {
  const res = await fetch(`${API_URL}/${idRemoto}`, { method: 'DELETE' })

  // Valido igual que en las otras operaciones para no presentar un borrado fallido como exitoso
  if (!res.ok) throw new Error(`Error al eliminar la tarea (HTTP ${res.status})`)
}

// Esta función modifica solo algunos campos de una tarea y deja intactos los que no viaja en el cuerpo
// El método de actualización parcial se distingue del reemplazo porque no borra lo que omite
export async function patchTarea(idRemoto, cambios) {
  const res = await fetch(`${API_URL}/${idRemoto}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cambios),
  })

  // Aplico la misma validación que en el reemplazo, porque un fallo al editar también debe llegar a la interfaz
  if (!res.ok) throw new Error(`Error al editar la tarea (HTTP ${res.status})`)

  // Devuelvo la respuesta porque quien edita necesita saber que el servidor aceptó el cambio
  return res.json()
}
