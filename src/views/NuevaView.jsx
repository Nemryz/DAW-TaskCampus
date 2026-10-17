import TaskForm from "../components/TaskForm";

// Esta vista muestra el formulario y le pasa el aviso de si hay una creación en curso
const NuevaView = ({ onAgregar, creando, error, exito }) => {
  return (
    <TaskForm onAgregar={onAgregar} creando={creando} error={error} exito={exito} />
  );
};

// Exporto la vista para que App.jsx la monte cuando la vista activa sea la de nueva tarea
export default NuevaView;