import Card from "./Card";
import Button from "./Button";
import TaskItem from "./TaskItem";
import EmptyState from "./EmptyState";

// Recibo el filtro y la búsqueda desde App.jsx porque si vivieran aquí se perderían al cambiar de vista
// La lista ya llega filtrada, por eso este componente solo la dibuja
const TaskList = ({
  title,
  tareas,
  cargando,
  error,
  filtro,
  onCambiarFiltro,
  busqueda,
  onCambiarBusqueda,
  onToggle,
  onEditar,
  onEliminar,
  enOperacion = new Set(),
}) => {
  // Retorno temprano mientras la petición viaja, así no se dibuja una lista vacía que confunda
  if (cargando) {
    return (
      <Card titulo={title}>
        <p className="estado-carga">Cargando tareas...</p>
      </Card>
    );
  }

  // Muestro el motivo del fallo en rojo en lugar de una lista vacía que haría pensar que no hay tareas
  if (error) {
    return (
      <Card titulo={title}>
        <p className="estado-error">Error: {error}</p>
      </Card>
    );
  }

  // Distingo si la lista está vacía por los filtros o porque realmente no hay tareas
  const hayFiltros = filtro !== "todas" || busqueda.trim() !== "";

  return (
    <Card titulo={title}>
      {/* Marco el filtro activo con otra variante para que se note cuál está elegido */}
      <div className="filtros">
        <Button
          label="Todas"
          onClick={() => onCambiarFiltro("todas")}
          variant={filtro === "todas" ? "primary" : "secondary"}
        />
        <Button
          label="Pendientes"
          onClick={() => onCambiarFiltro("pendientes")}
          variant={filtro === "pendientes" ? "primary" : "secondary"}
        />
        <Button
          label="Completadas"
          onClick={() => onCambiarFiltro("completadas")}
          variant={filtro === "completadas" ? "primary" : "secondary"}
        />
      </div>

      {/* Campo controlado: su valor viene de App y cada tecla le avisa para que recalcule la lista */}
      <div className="busqueda">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => onCambiarBusqueda(e.target.value)}
          placeholder="Buscar por título..."
          className="task-input"
        />
      </div>

      {/* Comparo con cero de forma explícita porque así evito que React dibuje un número suelto */}
      {tareas.length === 0 && (
        <EmptyState
          mensaje={
            hayFiltros
              ? "No hay tareas en esta categoría."
              : "No hay tareas. ¡Agrega la primera!"
          }
        />
      )}

      <ul className="task-list">
        {/* Genero un componente por tarea y uso la identidad local como clave porque es única y no cambia */}
        {tareas.map((tarea) => (
          <TaskItem
            key={tarea.idLocal}
            tarea={tarea}
            enOperacion={enOperacion.has(tarea.idLocal)}
            onAlternar={onToggle}
            onEditar={onEditar}
            onEliminar={onEliminar}
          />
        ))}
      </ul>
    </Card>
  );
};

// Exporto el componente para que la vista de tareas lo monte
export default TaskList;