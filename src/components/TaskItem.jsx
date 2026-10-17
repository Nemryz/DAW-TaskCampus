// Traigo el estado para saber si la persona está editando el título y qué escribió
import { useState } from "react";
import Badge from "./Badge";
import Button from "./Button";

// Cada tarea pasa a ser su propio componente porque la edición en línea necesita estado por tarea
// Recibo las tres acciones por props porque este componente solo muestra y avisa, no decide qué hacer
const TaskItem = ({ tarea, enOperacion = false, onAlternar, onEditar, onEliminar }) => {
  // Este estado indica si el título se muestra como texto o como campo editable
  const [editando, setEditando] = useState(false);

  // Guardo lo que la persona escribe aparte del título real para poder descartarlo si queda vacío
  const [tituloEditado, setTituloEditado] = useState(tarea.titulo);

  const handleIniciarEdicion = () => {
    // No dejo editar mientras otra operación viaja para evitar cambios cruzados
    if (enOperacion) return;
    setTituloEditado(tarea.titulo);
    setEditando(true);
  };

  const handleGuardarEdicion = () => {
    const nuevoTitulo = tituloEditado.trim();
    setEditando(false);
    // Si el título quedó vacío o no cambió, vuelvo al anterior sin avisar a nadie
    if (nuevoTitulo === "" || nuevoTitulo === tarea.titulo) return;
    onEditar(tarea.idLocal, nuevoTitulo);
  };

  const handleTecla = (e) => {
    // Enter quita el foco del campo y así el guardado ocurre en un solo lugar, el evento de perder el foco
    if (e.key === "Enter") e.currentTarget.blur();
  };

  return (
    <li className="task-item">
      <div className="task-info">
        {/* Al hacer clic en la etiqueta se cambia el estado de la tarea, salvo que haya una operación en curso */}
        <Badge
          texto={tarea.completada ? "completada" : "pendiente"}
          onClick={
            enOperacion ? undefined : () => onAlternar(tarea.idLocal, tarea.completada)
          }
        />

        {/* Esta etiqueta avisa que la tarea nació en la sesión y no existe en el servidor */}
        {tarea.esLocal && <Badge texto="local" />}

        {/* Alterno entre el campo editable y el texto con un ternario porque son dos opciones en el mismo lugar */}
        {editando ? (
          <input
            type="text"
            value={tituloEditado}
            onChange={(e) => setTituloEditado(e.target.value)}
            onBlur={handleGuardarEdicion}
            onKeyDown={handleTecla}
            className="task-input"
            autoFocus
          />
        ) : (
          <span
            className={tarea.completada ? "task-completada" : ""}
            onDoubleClick={handleIniciarEdicion}
          >
            {tarea.titulo}
          </span>
        )}
      </div>

      {/* Deshabilito los botones mientras la operación viaja para que no se dispare dos veces */}
      <div className="task-acciones">
        <Button
          label={tarea.completada ? "Desmarcar" : "Completar"}
          onClick={() => onAlternar(tarea.idLocal, tarea.completada)}
          variant={tarea.completada ? "success" : "primary"}
          disabled={enOperacion}
        />
        <Button
          label="Eliminar"
          onClick={() => onEliminar(tarea.idLocal)}
          variant="danger"
          disabled={enOperacion}
        />
      </div>
    </li>
  );
};

// Exporto el componente para que la lista dibuje uno por cada tarea
export default TaskItem;