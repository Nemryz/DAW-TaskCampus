import Card from "./Card";

// Recibo los cuatro contadores ya calculados desde App.jsx porque el resumen no debe recalcular los datos
const TaskSummary = ({ total, completadas, pendientes, mostradas, filtroActual }) => {
  return (
    <Card titulo="Resumen">
      <div className="summary-grid">
        {/* Total de tareas de la colección */}
        <div className="summary-item">
          <p className="summary-numero">{total}</p>
          <p className="summary-label">Total</p>
        </div>

        {/* Tareas ya completadas */}
        <div className="summary-item">
          <p className="summary-numero summary-completadas">{completadas}</p>
          <p className="summary-label">Completadas</p>
        </div>

        {/* Tareas que todavía faltan */}
        <div className="summary-item">
          <p className="summary-numero summary-pendientes">{pendientes}</p>
          <p className="summary-label">Pendientes</p>
        </div>

        {/* Cuántas tareas muestra la lista según el filtro activo */}
        <div className="summary-item">
          <p className="summary-numero summary-mostrando">{mostradas}</p>
          <p className="summary-label">Mostrando ({filtroActual})</p>
        </div>
      </div>
    </Card>
  );
};

// Exporto el resumen para que App.jsx lo monte arriba de la lista
export default TaskSummary;