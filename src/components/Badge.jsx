// La etiqueta recibe el texto del estado porque con eso basta para elegir su color
// El clic es opcional porque no todas las etiquetas cambian algo al presionarlas
const Badge = ({ texto, onClick }) => {
  return (
    // Agrego una clase solo cuando hay clic para que el cursor avise que se puede presionar
    <span
      className={`badge badge-${texto}${onClick ? " badge-clickable" : ""}`}
      onClick={onClick}
    >
      {texto}
    </span>
  );
};

// Exporto la etiqueta para mostrarla junto al título de cada tarea
export default Badge;