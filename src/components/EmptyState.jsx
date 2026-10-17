const EmptyState = ({ icono, mensaje }) => {
  return (
    <div className="empty-state">
      {icono && <span className="empty-state-icono">{icono}</span>}
      <p>{mensaje}</p>
    </div>
  );
};

export default EmptyState;