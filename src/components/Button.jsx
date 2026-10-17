const Button = ({ label, onClick, variant = "primary", disabled = false, type }) => {
  return (
    <button
      className={`btn btn-${variant}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;