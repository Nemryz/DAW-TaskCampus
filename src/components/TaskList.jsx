// Guardo las tres tareas de la base dentro del propio archivo porque así llegó el proyecto entregado
const tasks = ['Aprender qué es React', 'Crear proyecto con Vite', 'Practicar JSX']
// Esta función abre una alerta del navegador y por ahora ocupa el lugar de la lógica real
function showTask(taskName) {
    alert(`Has seleccionado la tarea: ${taskName}`)
  }
// Recibo el título desde arriba porque App.jsx ya me lo pasa y antes estaba escrito dentro del marcado
function TaskList({ title }) {
    return (
    <section className="card">
      {/* El encabezado usa la prop para que la misma lista sirva con otro texto */}
      <h2 className="section-title">{title}</h2>
      <ul className="task-list">
          <li className="task-item">
            {tasks[0]} 
            {/* Uso una función flecha porque el manejador necesita saber qué tarea se está seleccionando */}
            <button onClick={() => showTask(tasks[0])} className="task-button">
                Seleccionar
            </button>          
          </li>
          <li className="task-item">
            {tasks[1]} 
            {/* Repito la misma estructura cambiando únicamente el índice que se lee del arreglo */}
            <button onClick={() => showTask(tasks[1])} className="task-button">
                Seleccionar
            </button>          
          </li>
          <li className="task-item">
            {tasks[2]} 
            {/* Esta tercera tarea es la última de la base y la etapa H2 sustituye todo el bloque por un recorrido */}
            <button onClick={() => showTask(tasks[2])} className="task-button">
                Seleccionar
            </button>          
          </li>          
      </ul>
    </section>
  )
}
// Exporto el componente para que App.jsx lo monte junto al resumen
export default TaskList
