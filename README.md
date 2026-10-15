# TaskCampus

TaskCampus es una aplicación de gestión de tareas académicas construida con React y Vite. La interfaz muestra las tareas del estudiante, permite crear nuevas, cambiar su estado, editar sus títulos, eliminarlas con confirmación y filtrarlas por estado y por texto.

El proyecto crece sobre una base que el curso entrega y que corresponde al cierre del Tutorial. Cada etapa posterior añade una pieza nueva y documenta en este archivo qué se construyó, dónde vive el código y de qué tutorial proviene cada decisión.

## Integrantes

| Nombre | Usuario de GitHub | Responsabilidad |
| --- | --- | --- |
| Ignacio Ampuero | Nemryz | Capa de datos, hook, servicio y coordinación |
| Santiago Herrera | Herreraklk | Capa de presentación, componentes reutilizables y estilos |

El repositorio es público y se puede clonar sin pedir permisos.

```
https://github.com/Nemryz/DAW-TaskCampus
```

## Versiones utilizadas

| Herramienta | Versión |
| --- | --- |
| Node.js | v24.15.0 |
| npm | 11.12.1 |
| React | 19.2.8 |
| Vite | 8.3.0 |

El proyecto funciona con cualquier versión de Node superior a 18, dado que React y Vite ya no dependyen de versiones antiguas del motor. Las versiones indicadas son las que se usaron para desarrollar y para verificar la entrega.

## Instalación, ejecución y compilación

Clonar el repositorio y entrar a la carpeta del proyecto

```
git clone https://github.com/Nemryz/DAW-TaskCampus.git
cd DAW-TaskCampus
```

Instalar las dependencias con el archivo de bloqueo

```
npm ci
```

Levantar el servidor de desarrollo

```
npm run dev
```

Vite muestra la dirección local y la aplicación queda disponible en esa ruta dentro del navegador. El servidor sigue corriendo mientras la consola permanezca abierta, y se detiene con la tecla de cancelación.

Compilar la versión de producción

```
npm run build
```

La salida queda en la carpeta de distribución, ya minificada y con los nombres de archivo hasheados, lista para publicar en cualquier hosting estático.

Revisar la compilación en un servidor local antes de publicar

```
npm run preview
```

Ejecutar el analizador de código

```
npm run lint
```

Verificación completa desde una copia limpia, que es la que demuestra que el archivo de bloqueo es coherente con el archivo.

```
git clone https://github.com/Nemryz/DAW-TaskCampus.git ../verificacion
cd ../verificacion
npm ci
npm run build
npm run lint
```

## Estructura del proyecto

```
taskcampus/
├── index.html                    punto de entrada de la aplicación
├── package.json                  manifiesto de dependencias y scripts
├── package-lock.json             archivo de bloqueo de dependencias
├── vite.config.js                configuración del empaquetador
├── eslint.config.js              configuración del analizador
├── public/                       archivos servidos sin procesar
└── src/
    ├── main.jsx                  monta React en el elemento raíz
    ├── App.jsx                   componente raíz y coordinación
    ├── App.css                   estilos de la aplicación
    ├── index.css                 estilos globales
    └── components/               piezas reutilizables de interfaz
        ├── Header.jsx
        ├── Footer.jsx
        ├── TaskSummary.jsx
        ├── TaskList.jsx
        └── ActionButton.jsx
```

La separación en carpetas sigue la arquitectura que enseña el Tutorial 12, donde la presentación vive en componentes, la lógica de estado en un hook propio y la comunicación con el servidor en un servicio independiente.

## Arquitectura en capas

La aplicación separa cuatro responsabilidades que antes se mezclaban en un solo archivo.

| Capa | Responsabilidad | Archivo |
| --- | --- | --- |
| Presentación | Mostrar datos y capturar acciones del usuario | `src/components/` |
| Coordinación | Mantener el estado compartido y derivar los datos calculados | `src/App.jsx` |
| Lógica de estado | Encapsular el estado de las tareas y las operaciones que lo modifican | `src/hooks/useTareas.js` |
| Comunicación | Realizar las peticiones HTTP y comprobar los resultados | `src/services/tareasService.js` |

Las capas de hook y de servicio todavía no existen en el estado actual del repositorio, porque corresponden a las etapas que se describen más adelante.

## Estado actual del proyecto

Esta tabla indica qué se encuentra implementado y qué se encuentra en construcción.

| Etapa | Estado | Origen |
| --- | --- | --- |
| Tutorial 04 | Completado | Base entregada |
| Tutorial 05 | Completado | Ignacio Ampuero |
| Tutorial 06 | Completado | Ignacio Ampuero |
| Tutorial 07 | En construcción | Ignacio Ampuero |
| Tutorial 08 | Pendiente | Santiago Herrera |
| Tutorial 09 | Pendiente | Santiago Herrera |
| Tutorial 10 | Pendiente | Santiago Herrera |
| Tutorial 11 | Pendiente | Ignacio Ampuero |
| Tutorial 12 | Pendiente | Ignacio Ampuero |

## Cobertura de tutoriales y detalle de tareas

Cada fila explica qué se hizo dentro del repositorio y en qué tutorial se encuentra el fundamento de esa decisión.

| Tutorial | Qué se hizo en el repositorio | Dónde vive |
| --- | --- | --- |
| 04 | Se creó el proyecto con el generador de Vite configurado para React en JavaScript, se verificó que Node y npm respondían correctamente y se montantó el árbol de componentes inicial con el punto de entrada HTML y el archivo que monta React en el elemento raíz | `index.html`, `src/main.jsx`, `src/App.jsx` |
| 05 | Se separó la interfaz en componentes reutilizables, se comunicaron datos entre padre e hijo mediante props desestructuradas, se reemplazó una alerta local por una función recibida como prop y se añadieron los eventos con parámetro usando una función flecha dentro del manejador | `Header.jsx`, `Footer.jsx`, `TaskSummary.jsx`, `TaskList.jsx`, `ActionButton.jsx` |
| 06 | Se aplicaron estilos externos con hojas separadas, se definieron modificadores de clase para el contenedor, la tarjeta, el título de sección, el listado, cada tarea y los botones, y se resolvió el alineamiento de los controles con la propiedad de distribución del espacio | `src/App.css`, `src/index.css` |
| 07 | Se incorporará el estado con el hook de uso de estado, se reemplazarán los datos fijos por una colección con identificador, título y condición, y se actualizarán objetos y arreglos sin modificar el valor anterior | `src/App.jsx`, `src/hooks/useTareas.js` |
| 08 | Se generará la lista a partir de los datos con el método de transformación de arreglos, se asignará una clave única y estable a cada elemento, se agregarán los filtros por condición y se aplicarán las técnicas de renderizado condicional | `src/components/TaskList.jsx`, `TaskSummary.jsx`, `EmptyState.jsx` |
| 09 | Se construirá el formulario controlado con validación de títulos, se cargarán los datos desde una API externa con el efecto de montaje y se encapsulará toda la lógica de lectura en un hook personalizado | `src/components/TaskForm.jsx`, `src/hooks/useTareas.js` |
| 10 | Se crearán los componentes de botón, insignia, tarjeta y ventana modal reutilizables, se migrarán todos los controles nativos al botón configurable y se agregarán los estilos correspondientes | `src/components/Button.jsx`, `Badge.jsx`, `Card.jsx`, `Modal.jsx`, `EmptyState.jsx`, `src/App.css` |
| 11 | Se implementarán las operaciones de creación, actualización y eliminación contra la API simulada, se comprobará el resultado de cada petición y se mostrarán los estados de carga y de error | `src/services/tareasService.js`, `src/hooks/useTareas.js` |
| 12 | Se elevará el estado al componente raíz para sincronizar las vistas, se separarán el hook y el servicio, y se completará el flujo de extremo a extremo con las tres vistas navegables | `src/App.jsx`, `src/views/`, `src/components/Navigation.jsx` |

## Trabajo realizado sobre la base entregada

El enunciado advierte que conservar los componentes originales sin cambios no constituye evidencia de desarrollo. Esta sección registra qué se transformó.

| Elemento recibido | Estado con el que llegó | Qué se hizo |
| --- | --- | --- |
| Aplicación raíz | Entregaba una cantidad fija de tareas, ejecutaba una alerta y componía toda la vista en un solo archivo | Se le retiraron los datos fijos y la alerta, y se convirtió en el punto de coordinación que comparte el estado entre las vistas |
| Listado de tareas | Mostraba tres tareas mediante marcado repetido y sus botones solo ejecutaban alertas | Dejará de contener marcado escrito a mano para generarse desde los datos, recibir por props las acciones y presentar estados diferenciados de carga, error y resultado vacío |
| Resumen | Mostraba una cantidad fija recibida por prop | Pasará a calcular sus contadores a partir de la colección de tareas y del filtro activo |
| Botón de acción | Ejecutaba una función de alerta sin aportar comportamiento real | Se sustituye por un componente de botón configurable que se reutiliza en toda la aplicación |
| Estilos | Incluían el contenedor, la tarjeta, el listado y los botones | Se conservan y se amplían con los modificadores que necesitan los componentes nuevos |

### Defectos detectados en la base

La revisión del código recibido encontró tres observaciones que se corrigieron o se tienen planificadas.

En el archivo de la aplicación se pasaba un título al componente de listado, pero ese componente no recibía ninguna propiedad y escribía el encabezado directamente en el marcado. El dato viaja sin llegar a destino y hoy se corrige, de modo que el componente recibe la propiedad y la usa.

En el archivo de estilos globales quedaban reglas de la plantilla inicial del generador que se contradicen con la identidad visual del proyecto, porque obligaban a que la aplicación se oscureciera cuando el sistema operativo estaba en modo oscuro y fijaban un ancho de contenedor que rompía la composición. Esa limpieza corresponde a la etapa de estilos.

El componente de pie de página que aparece en el tutorial de componentes nunca fue creado en la base entregada. Se añadió con el taller del proyecto como propiedad, siguiendo el mismo patrón de props desestructuradas que el resto de los componentes.

## Limitaciones conocidas

La API que entrega los datos es un servicio público de prueba. Sus operaciones de escritura responden con los códigos de éxito correspondientes, aunque no conservan nada en el servidor. Por ese motivo la aplicación mantiene los cambios en memoria durante la sesión de trabajo y no los conserva al recargar la página, y esta restricción se declara de forma explícita en lugar de presentar la respuesta del servidor como si fuera un almacenamiento permanente.

Las tareas creadas durante la sesión recibirán una identidad local propia y se distinguen de las que provienen del servidor. Las operaciones posteriores sobre una tarea creada en la sesión se aplican únicamente sobre el estado local, porque no existe un recurso remoto al que actualizar, y la interfaz informa esa situación al usuario en lugar de fingir una sincronización.

La configuración del proyecto mantiene activo el compilador de React, una característica que viene incluida en la base y que optimiza el renderizado de forma automática. Esta optimización no forma parte del contenido de los tutoriales y se conserva tal como fue entregada.

## Entrega

Cada escuadrón debe subir un único archivo de texto al recurso habilitado en Canvas. Su contenido incluye los nombres completos de los integrantes y la dirección del repositorio público.

| Dato | Valor |
| --- | --- |
| Primer integrante | Ignacio Ampuero |
| Segundo integrante | Santiago Herrera |
| Repositorio | <https://github.com/Nemryz/DAW-TaskCampus> |

Las secciones de requisitos funcionales, vistas, investigación aplicada, pruebas y evidencias se completan al finalizar la implementación, porque deben reflejar el comportamiento real del proyecto y no una descripción anticipada.
