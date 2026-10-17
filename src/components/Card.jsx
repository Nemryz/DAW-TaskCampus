const Card = ({ titulo, children }) => {
  return (
    <div className="card">
      {/* El encabezado solo aparece si la tarjeta recibe un título */}
      {titulo && <h2 className="section-title">{titulo}</h2>}
      {children}
    </div>
  );
};

// Exporto la tarjeta para reutilizarla en las vistas y en los demás componentes
export default Card;