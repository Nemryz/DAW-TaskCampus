import TaskSummary from "../components/TaskSummary";

// Esta vista solo muestra los contadores que App.jsx ya calculó
const ResumenView = ({ total, completadas, pendientes, mostradas, filtroActual }) => {
  return (
    <TaskSummary
      total={total}
      completadas={completadas}
      pendientes={pendientes}
      mostradas={mostradas}
      filtroActual={filtroActual}
    />
  );
};

// Exporto la vista para que App.jsx la monte cuando la vista activa sea el resumen
export default ResumenView;