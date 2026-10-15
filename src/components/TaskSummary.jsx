// Recibo la cantidad desde arriba porque el resumen debe mostrar datos reales y no un número escrito a mano
function TaskSummary({ total }) {
  return (
    <section className="card">
      <h2 className="section-title">Resumen</h2>
      {/* Hoy existe un solo contador, y los contadores calculados desde la lista llegan con la etapa N4 */}
      <p>Tienes {total} tareas pendientes</p>
    </section>
  )
}

// Exporto el componente para que App.jsx lo coloque junto al listado
export default TaskSummary
