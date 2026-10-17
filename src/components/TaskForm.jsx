// Traigo el estado para guardar lo que la persona escribe en el campo
import { useState } from "react";
import Card from "./Card";
import Button from "./Button";

// Recibo la función de agregar desde App.jsx, que es quien coordina los datos
// Los tres avisos son opcionales porque no todos los usos del formulario los necesitan
const TaskForm = ({ onAgregar, creando = false, error = null, exito = false }) => {
  // El valor del campo vive en el estado para que lo escrito y lo mostrado siempre coincidan
  const [titulo, setTitulo] = useState("");

  // Guardo aparte el error de validación porque nace aquí y no viene de la operación remota
  const [errorValidacion, setErrorValidacion] = useState("");

  const handleSubmit = (e) => {
    // Evito que el formulario recargue la página, que es el comportamiento por defecto del HTML
    e.preventDefault();

    // Exijo al menos 3 caracteres útiles después de quitar los espacios de los extremos
    if (titulo.trim().length < 3) {
      setErrorValidacion("El título debe tener al menos 3 caracteres.");
      return;
    }

    // Entrego el título limpio a App.jsx y vacío el campo para la siguiente tarea
    onAgregar(titulo.trim());
    setTitulo("");
    setErrorValidacion("");
  };

  return (
    <Card titulo="Agregar Nueva Tarea">
      {/* El envío del formulario dispara handleSubmit, tanto con el botón como con la tecla Enter */}
      <form onSubmit={handleSubmit} className="task-form">
        {/* Input controlado: su valor siempre refleja el estado y cada tecla lo actualiza */}
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Escribe el título de la tarea..."
          className="task-input"
        />
        {/* Deshabilito el botón mientras la operación viaja para evitar tareas duplicadas */}
        <Button label="Agregar" variant="primary" disabled={creando} />
      </form>

      {/* Muestro cada aviso solo cuando existe, así no queda espacio vacío en la pantalla */}
      {errorValidacion && <p className="form-error">{errorValidacion}</p>}
      {error && <p className="form-error">{error}</p>}
      {exito && <p className="form-exito">Tarea agregada correctamente.</p>}
    </Card>
  );
};

// Exporto el formulario para que App.jsx lo monte arriba de la lista
export default TaskForm;