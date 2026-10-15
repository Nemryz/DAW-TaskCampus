// Recibo la cantidad desde arriba porque el resumen debe mostrar datos reales y no un número escrito a mano
// Las propiedades que este componenteTodavía no destructura igual se las entrega el padre, y H2 las aprovecha
function TaskSummary({ total }) {
  return (
    <section className="card">
      <h2 className="section-title">Resumen</h2>
      <p>Tienes {total} tareas pendientes</p>
    </section>
  )
}

// Exporto el componente para que App.jsx lo coloque junto al listado
export default TaskSummary
