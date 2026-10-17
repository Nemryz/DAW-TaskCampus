import Button from "./Button";

// Declaro las tres vistas en un arreglo porque así los botones se generan con un recorrido y no se repite el marcado
// El valor es lo único que entrego hacia arriba, de modo que ninguna otra pieza necesita conocer cómo se dibujan las vistas
const vistas = [
  { valor: "resumen", etiqueta: "Resumen" },
  { valor: "tareas", etiqueta: "Tareas" },
  { valor: "nueva", etiqueta: "Nueva" },
];

// Recibo la vista activa y la función de cambio desde App.jsx, que es quien decide qué vista se monta
const Navigation = ({ vistaActiva, onCambiarVista }) => {
  return (
    <nav className="navegacion">
      {vistas.map((vista) => (
        // Marco la vista activa con otra variante para que se note dónde está la persona
        <Button
          key={vista.valor}
          label={vista.etiqueta}
          onClick={() => onCambiarVista(vista.valor)}
          variant={vistaActiva === vista.valor ? "primary" : "secondary"}
        />
      ))}
    </nav>
  );
};

// Exporto la navegación para montarla arriba de la vista activa
export default Navigation;