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
