// Traigo el estado para recordar qué filtro eligió la persona
import { useState } from "react";
import Button from "./Button";
import Badge from "./Badge";
import EmptyState from "./EmptyState";

// Recibo el título y la colección desde App.jsx, que es quien coordina los datos
// Los avisos de carga y error ya llegan, pero los empiezo a usar en la etapa H2
const TaskList = ({ title, tareas }) => {
  // El filtro vive aquí por ahora porque solo esta lista lo necesita
  const [filtro, setFiltro] = useState("todas");

  // Calculo la lista filtrada en cada renderizado porque es un dato derivado y no un estado nuevo
  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === "pendientes") return !t.completada;
    if (filtro === "completadas") return t.completada;
    return true;
  });

  return (
    <section className="card">
      <h2 className="section-title">{title}</h2>

      {/* Uso el botón reutilizable y marco el filtro activo con otra variante para que se note cuál está elegido */}
      <div className="filtros">
        <Button
          label="Todas"
          onClick={() => setFiltro("todas")}
          variant={filtro === "todas" ? "primary" : "secondary"}
        />
        <Button
          label="Pendientes"
          onClick={() => setFiltro("pendientes")}
          variant={filtro === "pendientes" ? "primary" : "secondary"}
        />
        <Button
          label="Completadas"
          onClick={() => setFiltro("completadas")}
          variant={filtro === "completadas" ? "primary" : "secondary"}
        />
      </div>

      {/* Comparo con cero de forma explícita porque así evito que React dibuje un número suelto */}
      {tareasFiltradas.length === 0 && (
        <EmptyState mensaje="No hay tareas en esta categoría." />
      )}

      <ul className="task-list">
        {/* Genero un elemento por tarea y uso la identidad local como clave porque es única y no cambia */}
        {tareasFiltradas.map((tarea) => (
          <li key={tarea.idLocal} className="task-item">
            <div className="task-info">
              {/* La etiqueta se calcula desde el dato de la tarea, así no se guarda un estado aparte */}
              <Badge texto={tarea.completada ? "completada" : "pendiente"} />
              {/* Tacho el título cuando está completada mediante una clase de App.css */}
              <span className={tarea.completada ? "task-completada" : ""}>
                {tarea.titulo}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

// Exporto el componente para que App.jsx lo monte junto al resumen
export default TaskList;