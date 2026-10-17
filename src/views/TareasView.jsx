import TaskList from "../components/TaskList";

// Esta vista reenvía a la lista todo lo que App.jsx le entrega, porque la lista ya sabe qué hacer con cada prop
const TareasView = (props) => {
  return <TaskList {...props} />;
};

// Exporto la vista para que App.jsx la monte cuando la vista activa sean las tareas
export default TareasView;