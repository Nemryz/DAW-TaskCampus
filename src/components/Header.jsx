// Recibo los textos desde el componente padre porque así esta cabecera sirve en cualquier proyecto
function Header({ title, description }) {
  return (
    <header className="header">
      {/* El título y la descripción llegan como props y por eso este archivo no repite datos fijos */}
      <h1 className="header-title">{title}</h1>
      <p className="header-description">{description}</p>
    </header>
  )
}

// Exporto el componente con nombre para que App.jsx pueda importarlo sin importar la ruta
export default Header
