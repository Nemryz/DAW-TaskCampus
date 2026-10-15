// Recibo la acción desde el padre porque así el componente no decide qué hacer por su cuenta
function ActionButton({ onReview }) {
  return (
    <section>
      <h2>Acciones</h2>
      {/* Al recibir la función como prop, el componente se limita a ejecutarla sin conocer su contenido */}
      <button onClick={onReview} className="task-button">
        Revisar tareas
      </button>
    </section>
  )
}

// Este componente viene del Tutorial 05 y se retira en la etapa H2 cuando el botón configurable lo reemplace
export default ActionButton
