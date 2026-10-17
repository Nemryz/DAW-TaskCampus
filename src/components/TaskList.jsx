// Traigo el estado para recordar qué filtro eligió la persona
import { useState } from "react";
import Card from "./Card";
import Button from "./Button";
import Badge from "./Badge";
import EmptyState from "./EmptyState";

// Recibo la colección, los avisos y las dos acciones desde App.jsx, que es quien coordina los datos
const TaskList = ({ title, tareas, cargando, error, onToggle, onEliminar }) => {
  // Declaro el estado antes de cualquier retorno temprano porque los hooks no pueden llamarse de forma condicional
  const [filtro, setFiltro] = useState("todas");

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

  // Si la colección llegó sin ninguna tarea, invito a crear la primera
  if (tareas.length === 0) {
    return (
      <Card titulo={title}>
        <EmptyState mensaje="No hay tareas. ¡Agrega la primera!" />
      </Card>
    );
  }

  // Calculo la lista filtrada en cada renderizado porque es un dato derivado y no un estado nuevo
  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === "pendientes") return !t.completada;
    if (filtro === "completadas") return t.completada;
    return true;
  });

  return (
    <Card titulo={title}>
      {/* Marco el filtro activo con otra variante para que se note cuál está elegido */}
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

            {/* Agrupo los botones a la derecha y paso la identidad local para que App sepa qué tarea cambió */}
            <div className="task-acciones">
              <Button
                label={tarea.completada ? "Desmarcar" : "Completar"}
                onClick={() => onToggle(tarea.idLocal, tarea.completada)}
                variant={tarea.completada ? "success" : "primary"}
              />
              {/* Este botón no borra: solo avisa a App para que abra la ventana de confirmación */}
              <Button
                label="Eliminar"
                onClick={() => onEliminar(tarea.idLocal)}
                variant="danger"
              />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

// Exporto el componente para que App.jsx lo monte junto al resumen
export default TaskList;