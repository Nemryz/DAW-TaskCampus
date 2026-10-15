// Muestro el nombre de la asignatura al pie de la interfaz y lo recibo como prop desde App
function Footer({ course }) {
  return (
    <footer className="footer">
      {/* La clase de estilo separa esta zona del contenido con una línea y un margen */}
      <p className="footer-text">{course}</p>
    </footer>
  )
}

// Este componente nació como tarea adicional del Tutorial 05 y hoy reemplaza a un pie escrito a mano
export default Footer
