# TaskCampus

TaskCampus es una aplicación de gestión de tareas académicas construida con React y Vite. A través de su interfaz podemos consultar las tareas, crear nuevas, cambiar su estado, editar sus títulos, eliminarlas con confirmación y filtrarlas por estado y por texto.

El proyecto nace de una base que el curso entrega y que corresponde al Tutorial 04. A partir de ahí construimos nosotros todo lo que el enunciado exige, y este documento sirve para explicar no solo qué construimos sino por qué lo construimos así. Queremos que cualquier persona que lo lea entienda el razonamiento detrás de cada decisión, porque el enunciado evalúa el desarrollo y no la existencia de los archivos.

La primera decisión que tomamos fue no repartir el trabajo por tutorial completo. Si lo hubiéramos hecho, el formulario del tutorial 09 habría quedado bloqueado esperando al botón reutilizable del tutorial 10, y el orden natural de aprendizaje se habría invertido. Entender por qué repartimos por capa arquitectónica es entender cómo se construyó el proyecto.

Lo segundo que decidimos fue documentar cada etapa con su verificación. Un commit sin una forma de comprobarlo es una afirmación, y una afirmación no es evidencia. Por eso cada etapa del proyecto lleva una sección que explica cómo se comprueba, y por eso la tabla de evidencias documenta casos reales medidos en el navegador.

Finalmente, decidimos verificar la aplicación más allá de lo evidente. Al revisar los requisitos de error y de operación en curso, descubrimos un defecto que la lectura del código no había mostrado. Esa historia la contamos entera más abajo porque demuestra que la verificación honesta puede encontrar cosas que la revisión estática no ve.

## Identificación del proyecto

### Integrantes

| Nombre | Usuario de GitHub | Responsabilidad |
| --- | --- | --- |
| Ignacio Ampuero | Nemryz | Capa de datos, gancho, servicio y coordinación |
| Santiago Herrera | Herreraklk | Capa de presentación, componentes reutilizables y estilos |

Decidimos repartir la responsabilidad en dos capas que se tocan lo mínimo. Ignacio se ocupa de producir y conservar el estado, mientras que Santiago se ocupa de mostrarlo y de capturar las acciones de la persona.

El repositorio es público y se puede clonar sin pedir permisos, porque el enunciado exige que cualquiera pueda descargar el proyecto para evaluarlo.

```text
https://github.com/Nemryz/DAW-TaskCampus
```

### Versiones utilizadas

| Herramienta | Versión |
| --- | --- |
| Node.js | v24.15.0 |
| npm | 11.12.1 |
| React | 19.2.8 |
| Vite | 8.3.0 |

Registramos estas versiones porque la reproducibilidad depende de saber contra qué se construyó el proyecto. El enunciado no exige una versión exacta, sino que la instalación funcione desde una copia limpia. Por eso anotamos las que usamos para desarrollar y para verificar la entrega.

El proyecto funciona con cualquier versión de Node superior a 18. Esto ocurre porque React y Vite ya no dependen de versiones antiguas del motor, de modo que no hace falta fijar una versión mínima alta que impida instalar a otra persona. Dejamos constancia del mínimo porque es la información que realmente necesita quien quiera reproducir la instalación.

## Puesta en marcha

Vamos a explicar cada paso de la instalación y, sobre todo, por qué cada paso existe. Entender el motivo de un comando evita tener que improvisar cuando algo falla.

### Clonar el repositorio

```bash
git clone https://github.com/Nemryz/DAW-TaskCampus.git
cd DAW-TaskCampus
```

Clonar es la forma de traer el proyecto desde el repositorio público hasta el equipo. El segundo comando entra a la carpeta que se acaba de crear, y lo necesitamos porque el resto de los comandos se ejecutan desde dentro de ella.

### Instalar las dependencias

```bash
npm ci
```

Esta es la parte que más confunde a quien empieza, así que vamos a explicar la diferencia con detenimiento. El archivo de bloqueo, que en este proyecto se llama `package-lock.json`, es un inventario exacto de cada dependencia y de cada versión que comprobamos que funcionan juntas. La diferencia entre ambos comandos de instalación radica en que `npm install` puede resolver versiones nuevas por su cuenta cuando el archivo de bloqueo no lo impide, mientras que `npm ci` obliga a respetar exactamente lo que el archivo dice y falla si el manifiesto y el archivo de bloqueo no coinciden.

Elegimos `npm ci` por esa disciplina. Si el archivo de bloqueo dijera una versión y el manifiesto otra, `npm install` lo resolvería sin avisar y el proyecto seguiría instalándose, pero con un árbol de dependencias distinto al que verificamos. `npm ci` prefiere romperse antes que fingir que todo está bien.

### Levantar el servidor de desarrollo

```bash
npm run dev
```

Vite levanta un servidor local que lee los archivos y los sirve al navegador. La aplicación queda disponible en la dirección que Vite muestra en la consola, normalmente en el puerto local 5173.

Queremos explicar una característica de este comando porque es la que hace cómodo el desarrollo. El servidor no entrega los archivos como estaban en el momento de arrancar. Mantiene una conexión abierta con el navegador y, cada vez que guardamos un archivo, vuelve a leerlo y vuelve a servirlo. Por eso la pantalla se actualiza sola mientras escribimos, y por eso el analizador detecta los errores antes de que abramos el navegador.

El servidor sigue corriendo mientras la consola permanezca abierta. Para detenerlo se usa la tecla de cancelación del teclado, que en la mayoría de las terminales es Ctrl+C.

### Compilar la versión de producción

```bash
npm run build
```

Compilar es un proceso distinto de servir. Durante el desarrollo necesitamos los archivos legibles porque nosotros los vamos a leer y los errores tienen que ser localizables. Para publicar necesitamos lo contrario, que el navegador descargue lo mínimo y lo entienda lo más rápido posible.

Quiero ser preciso en una afirmación que suele quedar sin explicar. Al compilar se eliminan los espacios y los saltos de línea que existen solo para que las personas podamos leer el código, y además se acortan los nombres de los archivos. Ese acortamiento no es decorativo. El nombre de cada archivo incluye una huella de su contenido, de manera que si el contenido cambia, el nombre cambia también. Como el nombre es distinto, el navegador no puede servir la versión anterior desde su caché, y por eso el cambio llega a quien está usando la aplicación.

La salida queda en la carpeta de distribución, ya preparada para cualquier hosting estático y para publicarla con un deploy sin cambiar nada más.

### Revisar la compilación en un servidor local

```bash
npm run preview
```

Sirve la carpeta de distribución en lugar de los archivos fuente, y sirve para comprobar que el resultado compilado funciona igual que durante el desarrollo. No es un paso redundante. Hay errores que solo aparecen después de compilar, porque la compilación reordena y combina los módulos de una manera que el servidor de desarrollo no reproduce.

### Ejecutar el analizador de código

```bash
npm run lint
```

El analizador revisa el código sin ejecutarlo y busca problemas que funcionan pero que son una mala decisión. Los más frecuentes en este proyecto son el uso de una dependencia en un lugar donde no corresponde, una función que se crea en cada renderizado y una referencia a algo que ya no existe.

Lo ejecutamos antes de cada integración, no al final. Si el analizador falla, queremos saber qué lo rompió, y un fallo que aparece después de cien líneas de cambios cuesta mucho más localizar.

### Verificación desde una copia limpia

Esta es la comprobación que el enunciado pide de forma expresa y la que más valor tiene para la evaluación, porque no demuestra que nuestro código funcione en nuestra máquina sino que funciona en la de cualquiera.

```bash
git clone https://github.com/Nemryz/DAW-TaskCampus.git ../verificacion
cd ../verificacion
npm ci
npm run build
npm run lint
```

La carpeta de destino se llama verificación y no contiene lo que ya tenemos, así que si algo funciona es porque funciona de verdad. Si quisiéramos abreviar y probar sobre el proyecto que ya tenemos, el resultado no valdría, porque las dependencias ya instaladas pueden ocultar un archivo de bloqueo incoherente. La honestidad de la prueba depende de que el punto de partida esté vacío.

Ejecutamos el analizador después de compilar y no al revés porque ninguna de las dos operaciones depende de la otra, y el orden solo importa para leer mejor el resultado. Si algo falla, el último mensaje de la consola señala el problema.

### Resultado de la verificación ejecutada

Un procedimiento que solo se describe no es una prueba. Por eso ejecutamos la verificación y anotamos aquí lo que obtuvimos, con el detalle suficiente para que alguien pueda comparar.

La comprobación se hizo sobre una copia recién clonada del repositorio publicado, en el commit `6a33c07`, y no sobre la carpeta en la que trabajamos. Esa diferencia importa porque en nuestra carpeta las dependencias ya estaban instaladas y un archivo de bloqueo incoherente pasaría inadvertido.

| Comprobación | Resultado obtenido |
| --- | --- |
| Clonado | El repositorio baja sin pedir permisos y llega sin la carpeta de dependencias |
| `npm ci` | Instalación completa, cero vulnerabilidades reportadas y 31 paquetes con financiamiento |
| `npm run build` | Compilación correcta en 822 milisegundos, con 235,92 kilobytes de JavaScript y 4,49 de estilos |
| `npm run lint` | El analizador no reporta ninguna observación |
| Carga inicial | Diez tareas obtenidas de la API con tres completadas y siete pendientes |
| Navegación entre las tres vistas | Las tres se dibujan, la activa se identifica y el filtro sobrevive al viaje de ida y vuelta |
| Creación de una tarea | La tarea aparece sin recargar y el aviso declara que queda solo en la sesión |
| Búsqueda por texto | Encuentra la coincidencia escrita en mayúsculas cuando el título está en minúsculas |
| Resultado sin coincidencias | Aparece el estado vacío con su mensaje |
| Cambio de estado | La insignia cambia y el aviso distingue entre tarea remota y tarea local |
| Borrado con confirmación | La ventana muestra el título real, cancelar conserva la tarea y confirmar la retira |
| Consola del navegador | Sin errores ni advertencias en todo el recorrido |

El resultado importa por una razón que no es técnica. Si alguien clona el repositorio y algo falla, el problema no está en su equipo ni en su versión de Node. Está en lo que entregamos, y eso se corrige antes de que la evaluación empiece. Por eso vale la pena ejecutar la comprobación en lugar de suponerla.

## Estructura del proyecto

### Árbol de archivos

```text
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
    ├── components/               piezas reutilizables de interfaz
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── TaskSummary.jsx
    │   ├── TaskList.jsx
    │   ├── TaskItem.jsx
    │   ├── TaskForm.jsx
    │   ├── Button.jsx
    │   ├── Badge.jsx
    │   ├── Card.jsx
    │   ├── Modal.jsx
    │   ├── EmptyState.jsx
    │   └── Navigation.jsx
    ├── views/                    las tres vistas obligatorias
    │   ├── ResumenView.jsx
    │   ├── TareasView.jsx
    │   └── NuevaTareaView.jsx
    ├── hooks/
    │   └── useTareas.js          estado y operaciones de las tareas
    └── services/
        └── tareasService.js      comunicación con la API
```

Quiero detenerme en una decisión de distribución de archivos que no es obvia. Las tareas y el filtro viven en el componente raíz y en el gancho, nunca dentro de una vista. Podríamos haberlo hecho al revés y todo habría funcionado durante un rato, hasta la primera vez que alguien cambiara de vista mientras tenía un filtro aplicado.

La razón es que una vista se desmonta cuando dejamos de mirarla. Todo lo que una vista guarde en su estado desaparece con ella, porque React destruye el componente y libera lo que tenía. Si el filtro viviera dentro de la vista de tareas, aplicarlo, viajar a la vista de resumen y regresar nos mostraría la lista sin filtrar. Por eso las vistas solo reciben datos ya resueltos y devuelven acciones, y por eso el estado vive dos niveles más arriba.

### Arquitectura en capas

La aplicación separa cuatro responsabilidades que antes se mezclaban en un solo archivo. Las identificamos siguiendo la arquitectura que enseña el tutorial 12 y las resolvimos en capas independientes, de manera que cada una tiene su propia ubicación y su propio conjunto de archivos. La primera y la segunda forman el frontend, que es lo que la persona ve y toca, y la tercera y la cuarta son el camino que lleva cada acción hasta el servidor y de regreso.

| Capa | Responsabilidad | Archivo |
| --- | --- | --- |
| Presentación | Mostrar datos y capturar acciones de la persona | `src/components/` y `src/views/` |
| Coordinación | Mantener el estado compartido y derivar los datos calculados | `src/App.jsx` |
| Lógica de estado | Encapsular el estado de las tareas y las operaciones que lo modifican | `src/hooks/useTareas.js` |
| Comunicación | Realizar las peticiones HTTP y comprobar los resultados | `src/services/tareasService.js` |

La ventaja de esta separación se entiende pensando en qué cambia cuando algo falla. Si el servidor deja de responder, el cambio necesario está en el archivo de servicio y en ningún otro. Si un contador se calcula mal, el problema está en el archivo que lo deriva y no hay que revisar los componentes. Si un botón no se ve bien, el problema está en los estilos y no toca la lógica.

Las cuatro capas están operativas. El componente raíz coordina, el gancho conserva el estado y las operaciones, el servicio realiza las peticiones y comprueba sus resultados, y los componentes y las vistas solo muestran y capturan.

Conviene detenerse en cómo viajan los datos entre las capas, porque es donde se ve si la separación sirve de algo. El archivo de servicio recibe un input sencillo, que es la ruta o el cuerpo de la petición, y devuelve un output con la respuesta cruda del servidor. El gancho toma ese output y lo convierte en tareas con la forma que la interfaz necesita, y ningún componente llama al servicio directamente. Grâce a ese orden, el día que cambiemos de API habrá que modificar un solo archivo y nada más.

## Vistas obligatorias

Las tres vistas exigidas están montadas desde un único punto y solo una se dibuja a la vez. El encabezado y los controles de navegación permanecen visibles en las tres, dado que el enunciado los pide siempre disponibles.

Cambiar de vista no recarga la aplicación, no pierde tareas y no reinicia el filtro ni la búsqueda. Quiero explicar por qué eso no es trivial, porque la recarga es lo que ocurre por omisión. Si el estado estuviera dentro de la vista, cambiar de vista equivaldría a reconstruirla desde cero y la recarga sería el resultado natural de cualquier navegación. Que no ocurra es consecuencia directa de haber dejado el estado fuera de las vistas.

### Resumen

Muestra cuatro cantidades derivadas de la colección. El total de tareas, la cantidad completadas, la cantidad pendientes y la cantidad que corresponde al filtro activo. Las tres primeras describen la colección completa y la cuarta describe lo que la persona está viendo ahora mismo.

La separación entre total y cantidad mostrada es deliberada y responde a un ejemplo concreto del enunciado. Con diez tareas y un filtro que devuelve cuatro, los dos valores aparecen por separado, de modo que nunca se confunde lo que existe con lo que se está viendo. Si solo mostráramos el cuatro, alguien podría pensar que el proyecto tiene cuatro tareas. Si solo mostráramos el diez, alguien podría pensar que hay diez tareas a la vista. La etiqueta que acompaña al cuarto contador nombra el filtro activo, de manera que el número siempre queda explicado.

La vista no guarda nada propio. Recibe los cuatro números ya resueltos desde el componente raíz y por eso nunca puede desincronizarse de la colección. Esta es una decisión que parece pequeña pero que evita una clase entera de errores. Si el resumen calculara sus propios números a partir de la lista que recibe, y esa lista ya estuviera filtrada, el resumen mostraría los datos de la lista en lugar de los datos de la colección, y los dos totales aparecerían iguales siempre.

### Tareas

Contiene la lista completa con los filtros por estado, el buscador por texto y los controles de operación de cada tarea. Cada fila muestra el título, una insignia de estado que alterna entre pendiente y completada, una insignia adicional cuando la tarea es local y los botones para completar, editar y eliminar.

El filtro por estado ofrece tres opciones que son todas, pendientes y completadas. El buscador ignora mayúsculas y minúsculas y se combina con el filtro activo en lugar de reemplazarlo, de manera que las dos condiciones se acumulan. Quiero explicar por qué se acumulan y no se pisan, porque las dos lecturas son razonables y solo una sirve. Si el buscador reemplazara al filtro, escribir un texto nos haría volver a la lista completa y la persona perdería de vista que estaba mirando solo las completadas. Si se acumulan, ambas decisiones se respetan y el conjunto de resultados se reduce con cada una.

Cuando la combinación no deja resultados, la vista muestra un estado vacío que explica que no hay tareas en esa categoría. No mostramos un error porque no lo hay. La petición funcionó, la respuesta llegó y el filtro no coincidió con nada. Confundir ese caso con un fallo haría que una persona creyera que la aplicación se rompió cuando en realidad su búsqueda no encontró lo que buscaba.

La edición en línea se abre con un doble clic sobre el título. El campo acepta Enter para guardar y la pérdida de foco para confirmar. Un título vacío o compuesto solo por espacios revierte al anterior sin enviar nada al servidor, y lo hacemos así porque un envío vacío sería una petición que el servidor acepta sin guardar nada y que la interfaz presentaría después como un éxito.

Los controles de una tarea se deshabilitan mientras su operación viaja y vuelven a habilitarse cuando termina. La razón de deshabilitar es que el servidor responde rápido pero no al instante, y durante ese intervalo una persona que pulse dos veces enviaría dos peticiones para la misma tarea. Bloquear el control durante el vuelo convierte una condición de carrera en una espera visible.

El borrado pide confirmación. La ventana muestra el título real de la tarea que se va a quitar, cancelar la cierra sin tocar nada y confirmarla ejecuta la petición y retira la tarea de la lista. Mostrar el título y no el número de la fila responde a la misma lógica, porque si la lista está ordenada o filtrada la posición no significa nada para quien está leyendo.

### Nueva tarea

Contiene el formulario controlado con un único campo de título y el botón que envía. El campo es controlado porque su valor vive en el estado del componente y no en el elemento del navegador. Quiero explicar esa diferencia porque es la diferencia entre un formulario que valida y uno que no puede validar. Cuando el valor vive fuera del elemento, la interfaz puede leerlo antes de enviar y decidir si la petición tiene sentido. Cuando vive dentro del elemento, la única forma de saberlo es enviar la petición y esperar.

La validación es local y ocurre en la pantalla. Un título vacío o compuesto solo por espacios no se guarda y el formulario explica el problema junto al campo. Un título válido llega a la capa de datos, aparece en la lista sin recargar y el aviso que confirma el resultado incluye la limitación de la API de práctica.

Mientras la creación viaja, el botón se deshabilita para evitar que la persona envíe dos veces el mismo formulario. El motivo es el mismo que en la edición, y lo repetimos porque es una decisión que conviene entender una sola vez y aplicar en todos lados.

### Conservación del estado al navegar

La navegación funciona con un estado que guarda la vista activa, una función de cambio que se entrega al componente de navegación y un renderizado condicional que decide cuál de las tres vistas montar. No hay rutas de dirección web ni historial del navegador, porque el enunciado los declara fuera de alcance.

Quiero detenerme en por qué descartamos el enrutamiento. La biblioteca de enrutamiento se menciona en los tutoriales pero nunca llega a desarrollarse, y añadirla habría significado una dependencia que el enunciado no pide y un comportamiento de rutas que tampoco exige. La solución con estado y renderizado condicional resuelve exactamente lo que se pide sin introducir nada nuevo.

El punto que hay que cuidar es dónde vive el estado. Las tareas, el filtro y la búsqueda están en el componente raíz y en el gancho, nunca dentro de las vistas. Como las vistas se desmontan al cambiar, un estado guardado dentro de una de ellas se perdería.

La verificación consiste precisamente en eso. Aplicamos un filtro, viajamos a otra vista, regresamos y comprobamos que el filtro sigue aplicado. Es una comprobación corta y es la que demuestra que la decisión arquitectónica se sostiene.

## Requisitos y verificación

### Estado de los tutoriales

El trabajo se reparte por capa arquitectónica y no por tutorial completo. Cada integrante asume fragmentos de varios tutoriales y entre ambos cubren los nueve.

Esta decisión responde al orden en que se dependen las piezas. El componente de botón que enseña el tutorial 10 es precisamente el que consume el formulario controlado del tutorial 09. Si el reparto fuera por tutorial completo, el formulario quedaría bloqueado hasta que el otro terminara el 10 y el orden natural de aprendizaje quedaría invertido. Con el reparto por capa cada integrante construye primero lo que necesita para avanzar por su cuenta.

Los tutoriales 08, 09 y 12 aparecen repartidos entre las dos capas. Esa coincidencia no señala un conflicto, señala las costuras donde el estado que produce una capa se convierte en propiedades que consume la otra.

| Tutorial | Hecho | Responsable | Archivos |
| --- | --- | --- | --- |
| 04 | Proyecto creado con el generador de Vite para React en JavaScript, punto de entrada HTML y montaje en el elemento raíz | Base entregada | `index.html`, `src/main.jsx` |
| 05 | Componentes separados, propiedades desestructuradas, función recibida como propiedad y eventos con parámetro. Se agregó el componente de pie de página y se corrigió la propiedad que el listado recibía sin usar | Base entregada y completada por Ignacio | `Header.jsx`, `Footer.jsx`, `TaskSummary.jsx`, `TaskList.jsx` |
| 06 | Estilos externos con modificadores de clase para contenedor, tarjeta, título, listado, tarea y botones, con el alineamiento de los controles resuelto. Se limpió la hoja de estilos globales que había dejado el generador y se forzó el modo claro | Ignacio | `src/App.css`, `src/index.css` |
| 07 | Estado de la colección en el componente raíz, efecto de montaje, actualización inmutable de objetos y arreglos, y las tres operaciones de escritura contra la API | Ignacio | `src/App.jsx`, `src/hooks/useTareas.js` |
| 08 | Recorrido de la lista con clave estable, filtros por estado, búsqueda por texto, tres estados de interfaz y los cuatro contadores derivados en el componente raíz | Ignacio y Santiago | `src/App.jsx`, `TaskList.jsx`, `TaskSummary.jsx` |
| 09 | Carga inicial desde la API, encapsulado de toda la lógica en un gancho propio y formulario controlado con validación de títulos | Ignacio y Santiago | `src/hooks/useTareas.js`, `TaskForm.jsx` |
| 10 | Los cinco componentes reutilizables, la migración de los controles nativos y los estilos asociados | Santiago | `Button.jsx`, `Badge.jsx`, `Card.jsx`, `Modal.jsx`, `EmptyState.jsx`, `src/App.css` |
| 11 | Servicio con los cuatro verbos, gancho con las tres operaciones de escritura y presentación de los estados de carga, error y resultado vacío | Ignacio y Santiago | `tareasService.js`, `useTareas.js`, `TaskList.jsx` |
| 12 | Separación entre gancho y servicio, componente de tarea con edición en línea e insignia local pulsable, navegación con los tres valores y las tres vistas | Santiago y Ignacio | `src/App.jsx`, `src/views/`, `Navigation.jsx` |

Los nueve tutoriales quedan cerrados. Ninguno tiene contenido pendiente.

### Estado de los requisitos funcionales

| Código | Requisito | Responsable | Estado |
| --- | --- | --- | --- |
| RF01 | Cargar las primeras diez tareas desde la API | Ignacio, en N1 | Cerrado y verificado |
| RF02 | Mostrar cada tarea con título, estado y controles, generado desde los datos | Santiago, en H2 | Cerrado y verificado |
| RF03 | Crear tareas mediante un formulario controlado | Santiago, en H3 | Cerrado y verificado |
| RF04 | Validar los títulos al crear y al editar | Santiago, en H3 | Cerrado y verificado |
| RF05 | Alternar entre pendiente y completada | Santiago aporta la pantalla e Ignacio aporta la operación | Cerrado y verificado |
| RF06 | Editar el título en línea | Santiago aporta la pantalla e Ignacio aporta la operación parcial | Cerrado y verificado |
| RF07 | Eliminar con confirmación | Santiago, en H3 | Cerrado y verificado |
| RF08 | Filtrar por todas, pendientes y completadas | Santiago, en H2 | Cerrado y verificado |
| RF09 | Buscar por texto del título | Santiago, en H4 | Cerrado y verificado |
| RF10 | Mostrar un resumen actualizado | Santiago, en H2 | Cerrado y verificado |
| RF11 | Informar carga, errores y resultados vacíos | Ignacio entrega los datos y Santiago las tres pantallas | Cerrado y verificado |
| RF12 | Informar operaciones en curso | Ignacio entrega el estado y Santiago lo refleja en los controles | Cerrado y verificado |
| RF13 | Navegar entre las tres vistas | Santiago aporta los componentes e Ignacio aporta la coordinación | Cerrado y verificado |

Los trece requisitos están cerrados y verificados en el navegador. Varios se resuelven de forma conjunta porque la lógica la aporta una capa y la pantalla la aporta la otra, de modo que ninguno depende de una sola persona.

El último tramo del trabajo se concentró en el componente raíz. Quiero explicar ese dato porque parece contradictorio. Las pantallas estaban terminadas desde la entrega de la capa de presentación y aun así la aplicación no funcionaba. Los componentes no decaían por sí solos porque nadie los conectaba al estado, y un componente que muestra datos que nadie le entrega se queda esperando para siempre.

Esa es la razón de que un solo archivo cerrara de golpe los requisitos que dependían de la conexión. No fue una tarea simple, fue una tarea acotada. Toda la lógica de presentación llevaba tiempo escrita y esperando, y el trabajo consistió en darle lo que esperaba.

### Tabla de evidencias verificables

Cada caso indica los pasos seguidos, lo que se esperaba, lo que se obtuvo y dónde puede comprobarse. La evidencia cita código y estados observables desde las herramientas del navegador, porque una captura puede respaldar el registro pero no reemplaza al código ejecutable.

Dimos esta forma a la tabla para que sea reproducible. Que alguien pueda repetir los pasos y obtener el mismo resultado vale más que una imagen que demuestra que en un momento dado algo funcionó.

| Caso probado | Pasos | Resultado esperado | Resultado obtenido | Evidencia asociada |
| --- | --- | --- | --- | --- |
| Carga inicial de la API | Abrir la aplicación sin intervenir la red | Diez tareas desde el servidor | Diez tareas cargadas | La pestaña Network muestra la petición de lectura con respuesta correcta |
| Contadores del resumen | Ir a la vista de resumen tras la carga | Cuatro cantidades coherentes con la colección | Total, completadas, pendientes y mostradas | Los cuatro valores se leen en la pantalla y coinciden con la colección |
| Título de la pestaña | Cargar y luego completar una tarea | El número de pendientes baja | El título baja de siete a seis | La pestaña del navegador muestra la cantidad derivada |
| Filtro de completadas | Seleccionar el filtro de completadas | Solo las tareas completadas y el control marcado | Tres tareas y el botón activo | La lista visible contiene únicamente tareas completadas |
| Búsqueda sin distinguir mayúsculas | Escribir un texto en mayúsculas que existe en minúsculas | La tarea aparece | La tarea aparece | El buscador encuentra el texto escrito en la otra capitalización |
| Filtro combinado con búsqueda | Combinar un filtro y un texto sin coincidencias | Un resultado vacío con su mensaje | Aparece el estado vacío | La vista muestra el mensaje de que no hay tareas en esa categoría |
| Creación de una tarea | Enviar un título válido desde la vista de nueva tarea | La tarea aparece sin recargar y sube el total | La tarea aparece y el total sube | El aviso de éxito aparece y la tarea está en la lista |
| Validación al crear | Enviar un título de dos letras | No se crea y el problema se informa | No se crea y el mensaje aparece | El formulario muestra el aviso de longitud mínima |
| Alternancia de estado | Completar una tarea pendiente | Cambian la insignia, el listado filtrado y el resumen | Cambian los tres | La insignia pasa a completada y los contadores se actualizan |
| Apertura de la edición en línea | Hacer doble clic sobre un título | Aparece un campo de texto | Aparece el campo con el valor actual | El elemento de entrada sustituye al texto en esa fila |
| Guardado de la edición | Escribir un título válido y confirmar con Enter | Se guarda y se avisa | Se guardó y el aviso apareció | El título nuevo aparece en la fila y el aviso confirma |
| Edición con título vacío | Escribir solo espacios y confirmar | No se guarda y vuelve el anterior | Revertió sin guardar | El título anterior permanece sin cambios |
| Apertura de la confirmación | Pedir eliminar una tarea | Aparece una ventana con el nombre de la tarea | La ventana muestra el título real | El texto de la ventana incluye el título de la tarea señalada |
| Cancelación del borrado | Abrir la confirmación y cancelar | La tarea permanece | La tarea permaneció | El contador no cambió y la ventana se cerró |
| Confirmación del borrado | Abrir la confirmación y confirmar | La tarea desaparece y el total baja | Desapareció y el total bajó | El aviso de eliminación apareció y la tarea salió de la lista |
| Controles deshabilitados en curso | Retrasar la respuesta del servidor y observar el estado intermedio | Los controles de esa tarea quedan deshabilitados | Ambos botones deshabilitados y la insignia con su valor anterior | El atributo que los deshabilita está activo durante la espera |
| Controles rehabilitados al terminar | Esperar a que la operación responda | Los controles vuelven a quedar libres | Quedaron libres y la insignia cambió | El atributo que los deshabilita se retiró tras la respuesta |
| Fallo en una escritura | Bloquear solo las peticiones de escritura y completar una tarea | No debe presentarse como exitosa | La insignia no cambió, hubo un aviso de error y ninguno de éxito | Un único aviso de error y la lista completa a la vista |
| Fallo en la lectura | Romper la conexión antes de cargar | Un aviso de error y sin lista fingida | Un aviso de error y el estado vacío | El mensaje de error aparece una vez |
| Filtro que sobrevive al cambio de vista | Aplicar completadas, viajar a resumen y regresar | El filtro sigue aplicado | El filtro siguió con tres resultados | El control del filtro continúa marcado al volver |
| Total frente a cantidad mostrada | Aplicar un filtro y mirar el resumen | Ambos valores aparecen por separado | Total general y cantidad mostrada con la etiqueta del filtro | Los dos valores aparecen con nombres distintos |
| Acceso a las tres vistas | Pulsar los tres controles de navegación | Cada vista se dibuja sin recargar | Las tres se dibujan | El encabezado y la navegación permanecen en las tres |
| Reutilización del botón | Buscar el componente de botón en el proyecto | Se usa en más de un lugar | Aparece en seis componentes | El archivo de cada componente lo importa |
| Reutilización de la ventana | Buscar el componente de confirmación | Se usa desde el flujo de borrado | Aparece en el componente raíz | La ventana se monta una sola vez |
| Ausencia de alertas | Buscar llamadas de alerta en el código | No hay ninguna | No hay ninguna | La búsqueda en la carpeta de código no devuelve resultados |
| Limpieza de la consola | Recorrer la aplicación completa | Sin errores ni advertencias | Sin errores ni advertencias | La consola permanece limpia |
| Analizador y compilación | Ejecutar las dos comprobaciones | Ambas terminan sin observaciones | Ambas pasan | El analizador no reporta nada y la compilación finaliza |
| Claves de la lista | Recorrer la lista con diez tareas | Sin avisos de clave | No hay avisos de clave | La consola no muestra advertencias de clave |

Las dos filas sobre el fallo en una escritura y sobre el fallo en la lectura aparecieron porque las forzamos. Nadie falla por accidente cuando la red funciona, así que para comprobar que no haya falsos éxitos decidimos romper la conexión a propósito y observar qué aparecía en pantalla.

### Defecto detectado durante la verificación

Esa decisión dio resultado. La comprobación de los requisitos de error y de operación en curso reveló un fallo que la revisión de código no había detectado. Cuando una escritura fallaba, la lista completa de tareas desaparecía y el mensaje de error aparecía dos veces.

La causa estaba en el componente raíz, que entregaba el error a la vista de tareas. Ese componente interpreta cualquier error como un error de lectura, de modo que reemplaza la lista por el texto del error. Pero el error también puede provenir de una escritura, y en ese caso las tareas siguen existiendo y deben permanecer a la vista para que la persona pueda reintentar.

Quiero explicar por qué ese defecto importa más allá de la molestia visual. Una persona que intenta completar una tarea, ve un fallo y pierde de vista las diez tareas que tenía, no puede saber si la tarea se completó en algún sitio ni puede reintentar sin recargar. El fallo no era solo mostrar un mensaje dos veces, era quitarle a la persona la posibilidad de seguir trabajando.

La corrección entrega el error como nulo a la vista de tareas, igual que ya se hacía con la vista de nueva tarea, porque el componente raíz lo muestra una sola vez. Con ese cambio la lista permanece visible, el aviso aparece una vez y los controles vuelven a quedar libres.

El caso es relevante por el método que lo produjo. La revisión estática del código había dado el comportamiento por correcto y el defecto solo apareció al provocar deliberadamente un fallo de red y observar el estado resultante. Queremos dejar esto escrito porque es la lección más útil del proyecto. Leer el código con atención no sustituye a probarlo en condiciones adversas, y un requisito que dice informar errores necesita un error de verdad para comprobarse.

## Investigación y aplicación al proyecto

El enunciado obliga a investigar cuatro temas y a documentar cada uno con su explicación, sus fuentes, los archivos donde se aplicó y un procedimiento para verificarlo. Los cuatro conversan entre sí, porque la separación en vistas que propone el primero es la condición que permite que los otros tres problemas aparezcan y se resuelvan.

Los cuatro están aplicados y verificados. Los explicamos a continuación en el orden en que nos aparecieron, que es el orden en que las decisiones se fueron encadenando.

### Navegación entre vistas

La biblioteca de enrutamiento solo se menciona al pasar en los tutoriales y nunca llega a desarrollarse, de modo que la primera investigación del proyecto consiste en decidir cómo separar tres vistas sin acudir a ella. La pregunta que guía el trabajo es cómo representar cuál de las vistas está activa, cómo conseguir que un evento del usuario la cambie y cómo seleccionar el componente visible sin provocar la recarga de la aplicación.

La solución se apoya en contenidos que ya se enseñan, es decir el estado, las propiedades, los eventos y el renderizado condicional. El componente raíz declara un estado que guarda la vista activa, se lo entrega junto con una función de cambio al componente de navegación, y a partir de ahí decide cuál de los tres componentes montar. Los controles de navegación entregan únicamente los valores reconocidos por el enunciado, que son resumen, tareas y nueva, de manera que ninguna otra pieza del proyecto necesita conocer la existencia de las vistas.

Esa última parte merece atención. Si los botones de navegación entregaran directamente un componente, cada vista quedaría atada a un control concreto y cambiar el orden de los botones obligaría a tocar el componente raíz. Al entregar en cambio un valor de texto, el botón no sabe qué va a mostrar y el componente raíz no sabe qué botón lo cambió. Cada uno conoce solo su mitad del contrato.

El punto delicado es la ubicación del estado compartido. Las tareas, el filtro y la búsqueda viven en el componente raíz y en el gancho, nunca dentro de las vistas, porque una vista se desmonta al salir y su estado interno se perdería con ella.

Como el enunciado no exige rutas de dirección web ni funcionamiento del historial del navegador, esta solución no modifica las dependencias del proyecto ni altera el manifiesto. El estado y el renderizado condicional viven en `src/App.jsx`, los controles viven en `src/components/Navigation.jsx` y las tres vistas viven en `src/views/`. La fuente consultada es la documentación oficial de React sobre el estado compartido entre componentes, disponible en react punto dev dentro de la sección que explica cómo compartir el estado entre componentes.

La evidencia se comprueba con un procedimiento concreto. Consistía en filtrar las tareas por un estado concreto, cambiar de vista y regresar a la anterior para comprobar que tanto la colección como los filtros se conservan intactos.

### Estado derivado

El tutorial 08 introduce los resultados filtrados como datos derivados y el tutorial 12 pide profundizar ese patrón, de modo que la investigación consiste en distinguir con claridad la información que debe guardarse en estado de aquella que puede calcularse a partir de él. La diferencia importa porque guardar en estado un valor que se puede recalcular abre la puerta a que ambas copias se desincronicen sin que nadie lo note.

Queremos explicar esa puerta con un ejemplo. Si guardáramos el total de tareas en estado y además guardáramos la lista de tareas, tendríamos dos fuentes de verdad. Al completar una tarea habría que acordarse de actualizar las dos, y el día que alguien olvide una, la pantalla mostraría un número que no corresponde con la lista. La desincronización no se ve en la consola ni lanza un error, solo aparece un número equivocado que nadie sabe explicar.

La aplicación necesita mantener sincronizados los contadores del resumen, los filtros por estado y la búsqueda por texto. La respuesta que se aplicó consiste en calcular todos esos valores a partir de la colección, del filtro activo y del texto escrito, sin conservar ninguna copia independiente de los resultados. El componente de resumen recibe los números ya resueltos desde el componente raíz y nunca los calcula por su cuenta, de manera que la presentación queda aislada de la lógica.

El cálculo vive en `src/App.jsx` y la fuente consultada es la documentación oficial de React sobre por qué no siempre hace falta un efecto, disponible en react punto dev dentro de la sección que explica ese criterio.

La evidencia se comprueba con operaciones sucesivas. Crear una tarea, cambiar su estado o eliminarla tiene que actualizar el resumen y la lista sin que nadie toque un estado adicional. El proyecto cumple esa parte con los cuatro contadores, que se derivan de la colección en cada renderizado, y con el efecto que escribe la pestaña del navegador, que consume el valor ya derivado en lugar de recalcularlo.

### Actualización funcional del estado

El tutorial 12 identifica la forma funcional del setter como tema de investigación, y el motivo del problema es concreto. Cuando el nuevo estado depende del anterior, escribir directamente el valor que se tiene a mano obliga a trabajar con una copia que puede no ser la que React conserva en ese momento, y el resultado es una lista que se actualiza a destiempo o que pierde operaciones encadenadas.

El fallo se entiende pensando en dos operaciones que llegan juntas. Si alguien completa dos tareas casi al mismo tiempo y las dos actualizaciones leen la misma lista antes de que la primera se guarde, la segunda sobrescribe a la primera y una de las dos tareas vuelve a su estado anterior. La forma funcional evita ese problema porque cada actualización recibe la lista vigente en el momento de aplicarse, no la lista que tenía en pantalla cuando alguien hizo clic.

La solución aplicada consiste en entregar siempre una función que recibe el estado vigente, y esa función construye arreglos y objetos nuevos para que React detecte el cambio por identidad. En el proyecto aparece exactamente en las tres operaciones de escritura, y ninguna de ellas pasa la colección directamente. La creación coloca la tarea al principio de un arreglo nuevo, la actualización conserva intactas las demás porque solo reemplaza el objeto cuya identidad coincide con la buscada, y el borrado devuelve un arreglo que ya no contiene esa tarea.

Quiero detenerme en la creación de arreglos nuevos porque es donde se ve mejor el motivo. Podríamos haber modificado el arreglo existente y después haber avisado a React de que cambió, y esa es exactamente la operación que el enunciado prohíbe. La razón de crear uno nuevo es que React compara por identidad, de manera que si le entregamos el mismo objeto que ya conoce, para él no ha cambiado nada y la pantalla no se repinta.

Este tema vive en `src/hooks/useTareas.js` y su fuente es la documentación oficial de React sobre el gancho de estado, disponible en react punto dev dentro de la sección de referencia de ese gancho.

La evidencia consiste en identificar las funciones que emplean el patrón y en comprobar que ninguna se desvía. Se revisó el archivo del gancho y las tres operaciones usan la forma funcional, de modo que la búsqueda de una actualización directa no devuelve resultados. Como ejemplo adicional, el efecto que escribe el título de la pestaña depende del contador derivado y no de la colección, lo que evita recalcular el mismo dato en dos lugares distintos.

### Identificadores y API simulada

El material de la asignatura aclara que la API de práctica no conserva las escrituras, pero no desarrolla un procedimiento completo para distinguir las identidades locales de los recursos remotos. Esa ausencia es la que se investiga, porque sin una regla clara la aplicación termina con claves duplicadas o modifica una tarea equivocada cuando la persona seleccionó otra.

La regla que se aplicó tiene dos mitades. Cada tarea mantiene una identidad local única y estable que sirve como clave en el recorrido, y conserva por separado la identidad remota cuando existe. Cuando una tarea nace durante la sesión, su identidad remota queda en nulo y las operaciones posteriores se aplican únicamente sobre el estado local, informando a la persona en lugar de fingir una sincronización que no ocurrió.

El proyecto aporta un ejemplo concreto de por qué la identidad remota queda en nulo. La lectura entrega diez tareas cuya identidad del servidor se convierte a texto, de modo que las claves son siempre cadenas y nunca colisionan con las que genera la aplicación. Una tarea creada durante la sesión recibe un prefijo y la hora actual, y la respuesta del servidor a esa creación siempre devuelve el mismo número, que no representa ningún recurso real, por lo que esa respuesta no se conserva.

Esa última frase merece énfasis porque es donde la mayoría de las soluciones se equivocan. El simulador responde a una creación con un número y ese número parece una confirmación. Si lo conserváramos, la tarea tendría una identidad remota que no existe, y la siguiente edición intentaría actualizar un recurso que el servidor nunca creó. El servidor respondería con éxito y la interfaz mostraría un éxito, de manera que la persona creería que su cambio está guardado en el servidor cuando no lo está en ninguna parte.

La construcción de la identidad ocurre en `src/hooks/useTareas.js` y la decisión de omitir la petición remota ocurre en las operaciones de actualizar y eliminar. La insignia que informa que la tarea es local ya existe en el componente de tarea, que la muestra junto al estado. La fuente consultada es la guía oficial del simulador de API, disponible en jsonplaceholder punto typicode punto com dentro de su sección de guía.

La evidencia se comprueba creando dos tareas consecutivas y verificando que se distinguen sin repetir clave, y comprobando además que un fallo remoto no altera silenciosamente otra tarea.

## Etapas de trabajo

Cada etapa se entrega como una rama independiente, se revisa mediante una solicitud de elevación y se integra en la rama principal una vez que compila. Las ocho etapas están integradas y verificadas.

Quiero explicar por qué una etapa por commit y por qué eso mejora el proyecto más allá del orden. Cada commit es una unidad que se puede revisar sola, volver a ejecutar y revertir sin arrastrar cambios ajenos. Cuando alguien lee el historial y ve los commits, cada uno le dice qué se cambió, por qué y cómo se comprobó. Ese historial es la evidencia del método.

### Etapas de Ignacio

Su responsabilidad es la capa de datos y la coordinación. Estas etapas construyen el servicio, el gancho y el estado compartido que alimentan a la capa de presentación.

| Etapa | Qué resuelve | Requisitos | Archivos que toca | Depende de | Cómo se comprueba | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| N1 | Conecta la aplicación con la API, reemplaza las tareas escritas a mano por datos reales y retira las alertas y la cantidad constante | RF01, RF11 | `src/services/tareasService.js`, `src/hooks/useTareas.js`, `src/App.jsx`, `index.html` | Nada, arranca desde la base | La pestaña Network muestra la petición de lectura y la consola muestra diez tareas con título y estado en español | Integrada y verificada |
| N2 | Implementa las operaciones de escritura y refleja cada resultado en el estado sin modificar el valor anterior | RF05 y RF07 en su parte lógica, tercer tema de investigación | `src/services/tareasService.js`, `src/hooks/useTareas.js` | N1 | Los cuatro verbos responden y ninguna actualización pasa el estado directo | Integrada y verificada |
| N3 | Aplica la identidad dual a las operaciones, agrega la actualización parcial y bloquea los controles mientras una operación viaja | RF06 y RF12 en su parte lógica, cuarto tema de investigación | `src/services/tareasService.js`, `src/hooks/useTareas.js` | N2 | Dos tareas creadas seguidas no repiten clave y los controles quedan deshabilitados | Integrada y verificada |
| N4 | Calcula los datos derivados y permite cambiar de vista sin recargar la aplicación | RF09, RF10, RF13 y RF08 en su parte de estado | `src/App.jsx` | N3 | Los filtros sobreviven al cambio de vista y los contadores se recalculan solos | Integrada y verificada |

### Etapas de Santiago

Su responsabilidad es la capa de presentación. Estas etapas construyen los componentes reutilizables, el formulario, la edición en línea y las tres vistas que consumen el estado que produce la otra capa.

| Etapa | Qué resuelve | Requisitos | Archivos que toca | Depende de | Cómo se comprueba | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| H1 | Construye la base de interfaz reutilizable que todas las etapas posteriores consumen | Criterio de organización y reutilización | `src/components/Button.jsx`, `Badge.jsx`, `Card.jsx`, `Modal.jsx`, `EmptyState.jsx`, `TaskList.jsx`, `src/App.css` | Nada, arranca desde la base | El botón aparece en más de un lugar y los estilos se aplican a los componentes nuevos | Integrada y verificada |
| H2 | Genera la lista a partir de los datos y diferencia los estados de carga, de error y de resultado vacío | RF02, RF08, RF10, RF11, segundo tema de investigación | `src/components/TaskList.jsx`, `src/components/TaskSummary.jsx`, `src/App.css` y borrar `src/components/ActionButton.jsx` | N1 | Diez tareas reales en pantalla, la consola sin avisos de clave y la búsqueda de alertas sin resultados | Integrada y verificada |
| H3 | Agrega el formulario controlado con validación e integra la confirmación de borrado | RF03, RF04, RF05 y RF07 en su parte de pantalla | `src/components/TaskForm.jsx`, `src/components/TaskList.jsx`, `src/App.css` | N2 | Un título vacío no guarda y avisa, cancelar el borrado conserva la tarea y los contadores bajan al confirmar | Integrada y verificada |
| H4 | Permite editar el título en línea, buscar por texto y cambiar entre las tres vistas | RF06, RF09, RF12, RF13, primer tema de investigación | `src/components/TaskItem.jsx`, `src/components/Navigation.jsx`, `src/views/`, `src/components/TaskList.jsx`, `src/components/TaskSummary.jsx`, `src/App.css` | N4 | La búsqueda ignora mayúsculas, un título vacío revierte al anterior y las tres vistas conservan tareas y filtros | Integrada y verificada |

Dentro de cada etapa el orden queda fijado por las dependencias de la tabla. En un sprint donde ambos trabajamos, la etapa de Ignacio se integra primero porque el archivo de coordinación es suyo, y la de Santiago se integra después de actualizar su rama.

### Cómo avanzó el trabajo de Ignacio

Las etapas de Ignacio construyen el camino que va desde el servidor hasta el estado compartido. Su secuencia tiene una lógica que conviene explicar porque cada decisión evita un problema que habría reaparecido más adelante.

La primera etapa creó el archivo de servicio que se comunica con el servidor y el archivo de gancho que encierra todo el estado de las tareas, conectó el componente raíz con ese gancho y corrigió el documento de entrada para declarar el idioma y el título correctos. También retiró la alerta del navegador y el botón de acción que solo servía para invocarla, y reemplazó la cantidad fija por el largo real de la colección.

La cantidad fija merece una explicación porque es un cambio pequeño con una consecuencia grande. Antes, el número de tareas estaba escrito en el archivo como un valor constante, de modo que la aplicación podía mostrar tres mientras mostraba diez. Sustituirlo por el largo real de la colección parece un cambio de una línea y en realidad elimina una clase entera de afirmaciones falsas, porque cualquier cambio posterior en la colección actualiza el número sin que nadie tenga que acordarse de cambiarlo.

El modelo de datos quedó resuelto en esa primera etapa y no en una posterior. Cada tarea viaja con una identidad local de tipo texto que sirve como clave en el recorrido, una identidad del servidor que puede ser nula y una bandera que indica si esa tarea existe realmente en el servidor. Tomar esa decisión en ese momento evitó tener que renombrar campos más adelante y permitió que las etapas siguientes trabajaran sobre un contrato estable.

El componente de listado recibió desde ese momento la colección junto con los avisos de la interfaz, aunque todavía no los utilizaba. Esa anticipación tenía un propósito concreto, porque dejaba escrita en el archivo del padre la firma que la otra capa necesitaba construir, de modo que no tuviera que deducirla ni quedarse esperando una definición.

La segunda etapa agregó las tres operaciones de escritura al servicio y al gancho, y todas usan la forma funcional del setter. Dos decisiones de esa etapa merecen registrarse. La primera es que la respuesta del servidor a la creación no se conserva, porque el simulador devuelve siempre la misma identidad y esa respuesta no representa ningún recurso. La segunda es que las operaciones de actualizar y eliminar averiguan si la tarea existe en el servidor antes de llamar al servicio, de manera que una tarea creada durante la sesión se modifica solo en el estado local y nunca se le asigna un recurso remoto que no existe.

La tercera entrega limpió la hoja de estilos globales, que era el último punto pendiente del tutorial 06. Ese archivo traía una paleta violeta, un bloque completo de modo oscuro y un ancho fijo de contenedor que rompía la composición. Al limpiarlo se declaró la escala de azules, se eliminaron las reglas que la plantilla había dejado y se forzó el modo claro, porque el valor automático tornaba oscura la interfaz en equipos con tema oscuro.

Esa última decisión la tomamos después de ver el proyecto verse oscuro en un equipo con el sistema configurado así. El valor automático no es un error, es una preferencia del sistema operativo, y una aplicación que solo usa el estilo automático acaba viéndose distinta en cada equipo. Forzar el modo claro hizo que la aplicación se viera igual en todos lados.

La cuarta etapa fue la que cerró el proyecto. Consistió en un solo archivo, el componente raíz, que conecta todas las piezas. Ahí se declararon los cuatro estados compartidos, que son el filtro, la búsqueda, la vista activa y la tarea señalada para borrar, y los cuatro manejadores de escritura. La decisión de que ninguno de esos estados viva dentro de una vista responde a la razón que explica por qué la aplicación se desarmaba al navegar. También se calcularon allí los datos derivados, de manera que los componentes de presentación solo reciben números y colecciones ya resueltos.

Después de integrar esa etapa, la verificación de los requisitos de error y de operación en curso reveló el defecto que se documenta más arriba. Esa corrección también exigía tocar el componente raíz para entregar el error como nulo a la vista de tareas, y el renombrado de la vista de nueva tarea para coincidir con el contrato actualizó la importación y el uso dentro del mismo archivo.

### Cómo avanzó el trabajo de Santiago

La entrega de Santiago se concentró en todo lo que la persona ve y toca. Su secuencia va desde la base reutilizable hasta las vistas completas, y cada bloque deja algo que las etapas siguientes consumen.

El primer bloque construyó los cinco componentes reutilizables y migró los controles nativos que traía la base hacia ellos. Ese trabajo resuelve de una vez el criterio de organización y reutilización, porque a partir de ese momento cada control de la aplicación es la misma pieza con distinta apariencia y el proyecto deja de depender de botones sueltos escritos de forma distinta en cada vista.

La ganancia no es solo de estilo. Un botón escrito tres veces se modifica tres veces cuando cambia un requisito, y es muy probable que alguien olvide una de las tres. Un botón reutilizado se modifica una vez y las tres apariciones cambian juntas, de manera que el comportamiento no puede quedar incoherente entre pantallas.

El segundo bloque hizo que la lista se generara a partir de los datos y que mostrara los tres estados que una colección puede tener, que son la carga, el error y el resultado vacío. También eliminó el botón de acción que solo invocaba una alerta, de modo que su función quedó cubierta por el componente de botón configurable.

El tercer bloque agregó el formulario controlado con su validación y conectó la confirmación de borrado. El formulario quedó como una pieza reutilizable que recibe la operación y los avisos por propiedades, de manera que no depende de ninguna vista en particular.

El cuarto bloque cerró la capa de presentación con la edición en línea, la insignia local pulsable, la búsqueda por texto, la navegación y las tres vistas completas. Las cuatro etapas entraron en una sola solicitud de elevación, con cinco commits interiores, uno por cada bloque de trabajo. Eso se aparta del plan original de una solicitud por etapa, aunque el resultado técnico cumple lo pedido y respeta la frontera de archivos.

La frontera de archivos se respetó. Santiago no modificó `src/index.css` ni `src/App.jsx`, salvo un salto de línea final. Esa era una condición expresa del contrato, porque el contrato prohibía tocar el archivo de coordinación.

Cuatro observaciones menores se revisaron con él y una quedó resuelta. El archivo de la vista nueva pasó a llamarse `NuevaTareaView.jsx` para coincidir con el contrato, y con ese cambio se actualizaron el nombre del componente, la importación en el archivo raíz y la estructura de este documento. Quedan tres acordadas para más adelante, que son la clase de estilo de la insignia local que todavía no existe, los puntos y comas de más en sus archivos y la ausencia del tipo declarado por defecto en el botón. Ninguna de las tres afecta al funcionamiento, porque el enunciado permite ajustar los nombres de las vistas y el formulario opera bien con el valor por defecto del navegador.

Los commits realizados por Santiago se encuentran en el branch llamado santiago, si es que no se visualizan por completo en el main.

## Metodología y contrato de integración

El desarrollo se organiza con un esquema próximo a Scrum, adaptado a un equipo de dos personas y a un alcance académico con fecha de entrega.

### Por qué se dividió el trabajo en etapas

El enunciado reúne nueve tutoriales que, por separado, parecen contenidos manejables. Al combinarlos producen una aplicación completa con capa de datos, capa de comunicación, capa de presentación, navegación y persistencia en memoria. Abandonar ese conjunto a dos personas tendría un riesgo que no es la falta de esfuerzo sino la dispersión, porque cada uno intentaría abarcar la totalidad del alcance y ambos chocarían en los mismos archivos.

La dispersión es el riesgo real de un equipo pequeño con un alcance grande. No es que cada persona trabaje poco, es que cada una trabaja en todo y el resultado es que las dos terminan tocando los mismos archivos al mismo tiempo y ninguna integración llega a terminarse.

La división por capa evita ese problema porque acota el terreno de cada uno. Ignacio se ocupa de producir y mantener el estado, Santiago se ocupa de mostrarlo e interactuar con él, y entre los dos existe una frontera nítida de archivos donde ninguno edita lo del otro. Esa frontera reduce los conflictos de integración a un número casi nulo, ya que los únicos puntos de contacto son las propiedades que cada uno define y entrega.

### Por qué se dividió en etapas pequeñas y verificables

Cada etapa responde a un conjunto concreto de requisitos, ocupa un número acotado de archivos y se puede comprobar sin necesidad de terminar el proyecto. Esa granularidad reproduce el ciclo central de Scrum, donde cada incremento debe producir algo verificable en lugar de acumular trabajo a ciegas.

El beneficio es doble. Por un lado, si una etapa falla, el error queda contenido en pocos archivos y se localiza rápido. Por otro lado, el historial de commits deja de ser un registro informal y pasa a ser la evidencia del método, porque cada commit corresponde a un incremento con propósito, alcance y resultado verificable.

La segunda mitad de ese beneficio no es evidente al principio. Un historial de commits parece un registro de escritura, y parece que lo importante es el resultado final de la aplicación. Pero cuando alguien revisa el proyecto sin conocer la historia, el historial es lo que le explica cómo se llegó ahí y por qué cada decisión tiene la forma que tiene.

### Por qué se trabaja con ramas, revisiones y fusiones

La rama principal, que en Git se llama branch principal, es el punto de referencia que el docente revisa, que se clona para la verificación de reproducibilidad y que el enunciado exige que funcione sin pedir permisos. Si todo el desarrollo ocurriera directamente sobre ella, cualquier error intermedio dejaría el repositorio en un estado que no compila y que no se puede revisar.

La rama de trabajo resuelve ese problema porque aísla cada etapa. La solicitud de elevación introduce una revisión antes de integrar, de modo que el otro integrante comprueba que la etapa compila, que respeta la frontera de archivos y que cierra los requisitos que dice servir. La fusión, que en Git se llama merge, reintegra el trabajo únicamente cuando está verificado.

De esa manera la rama principal permanece compilable en todo momento, la integración ocurre de forma continua en lugar de concentrarse en una fusión grande al final, y el historial registra el recorrido completo del proyecto con una etapa por commit. Además, si una etapa se alarga o se estropea, la rama se descarta sin afectar nada porque ese trabajo todavía no se integró.

### Contrato de integración

Este apartado define qué archivos puede tocar cada uno, qué recibe cada componente y qué devuelve el gancho, de modo que ninguno tenga que deducir nada.

Escribimos este contrato porque la coordinación entre dos personas falla con más frecuencia por suposiciones que por conflictos abiertos. Cuando alguien asume que el otro le va a pasar algo de cierta forma y el otro lo pasa de otra, el error aparece tarde y cuesta localizarlo. Un contrato escrito convierte la suposición en un acuerdo que se puede revisar.

Cada línea de este apartado dice qué entra y qué sale de cada pieza. Lo que entra son las props, que en React son los datos y las acciones que un componente recibe de su padre, y lo que sale es un conjunto de funciones que el padre usa para pedir un cambio. Cuando esa frontera está escrita, nadie tiene que adivinar nada.

#### Propiedad de archivos

| Archivo | Puede editarlo | No puede editarlo |
| --- | --- | --- |
| `src/components/` | Santiago | Ignacio |
| `src/views/` | Santiago | Ignacio |
| `src/App.css` | Santiago | Ignacio |
| `src/index.css` | Ignacio | Santiago |
| `src/App.jsx` | Ignacio | Santiago |
| `src/hooks/useTareas.js` | Ignacio | Santiago |
| `src/services/tareasService.js` | Ignacio | Santiago |

#### Propiedades que recibe cada componente

| Componente | Propiedades | Estado |
| --- | --- | --- |
| `TaskList` | `title` de tipo texto, `tareas` de tipo colección, `cargando` de tipo booleano y `error` de tipo texto o nulo | Entregadas y en uso. El error se entrega como nulo porque el componente raíz ya lo muestra |
| `TaskSummary` | `total`, `completadas`, `pendientes` y `mostradas` de tipo número, y `filtroActual` de tipo texto | Las cinco se entregan desde `src/App.jsx` |
| `Button` | `label`, `onClick`, `variant`, `disabled` y `type` | Definidas en H1 y en uso |
| `Badge` | `texto` | Definida en H1 y en uso |
| `Card` | `titulo` y `children` | Definidas en H1 y en uso |
| `Modal` | `visible`, `mensaje`, `onConfirmar` y `onCancelar` | Definidas en H1 y en uso |
| `EmptyState` | `icono` y `mensaje` | Definidas en H1 y en uso |
| `TaskForm` | `onAgregar`, `creando`, `error` y `exito` | Definidas en H3 y en uso |
| `TaskItem` | `tarea`, `enOperacion`, `onAlternar`, `onEditar` y `onEliminar` | Definidas en H4 y en uso |
| `Navigation` | `vistaActiva` y `onCambiarVista` | Definidas en H4 y en uso |

#### Qué devuelve el gancho de tareas

| Elemento | Tipo | Para qué sirve |
| --- | --- | --- |
| `tareas` | colección | La lista que se dibuja en pantalla |
| `cargando` | booleano | Distingue la carga inicial del contenido definitivo |
| `error` | texto o nulo | Muestra el motivo del fallo sin fingir una lista vacía |
| `exito` | texto o nulo | Confirma el resultado de una operación sin ocultar el matiz de la API simulada |
| `creando` | booleano | Deshabilita el envío del formulario mientras la creación viaja |
| `enOperacion` | conjunto de identidades | Permite deshabilitar los controles mientras una operación viaja |
| `crearTarea` | función | Crea una tarea y la coloca al principio de la colección |
| `actualizarTarea` | función | Cambia campos de una tarea y usa la identidad local para localizarla |
| `editarTitulo` | función | Envía una actualización parcial con el verbo de parche |
| `eliminarTarea` | función | Borra una tarea y avisa si el servidor rechaza la operación |

Las tres operaciones de escritura están conectadas al flujo de la interfaz y se invocan desde la vista de tareas y desde la vista de nueva tarea. La ventana de confirmação se monta una sola vez en el componente raíz, y por eso el borrado funciona desde cualquier vista que lo solicite.

#### Forma de cada tarea

| Campo | Tipo | Significado |
| --- | --- | --- |
| `idLocal` | texto | Identidad única y estable para la interfaz, se usa como clave en el recorrido |
| `idRemoto` | número o nulo | Identidad en el servidor, nula cuando la tarea se creó durante la sesión |
| `titulo` | texto | Título de la tarea |
| `completada` | booleano | Indica si la tarea está completada |
| `esLocal` | booleano | Indica que la tarea no existe en el servidor |

## Trabajo realizado sobre la base entregada

El enunciado advierte que conservar los componentes originales sin cambios no constituye evidencia de desarrollo. Esta sección registra qué se transformó.

Revisamos la base antes de modificar una línea, como pide la primera instrucción de desarrollo. Identificamos los datos fijos, los eventos que solo llamaban a una alerta y los estilos que venían de la plantilla. Solo después de saber qué había decidimos qué cambiar, y esa es la diferencia entre modificar con criterio y modificar por costumbre.

| Elemento recibido | Estado con el que llegó | Qué se hizo |
| --- | --- | --- |
| Aplicación raíz | Entregaba una cantidad fija de tareas, ejecutaba una alerta y componía toda la vista en un solo archivo | Se le retiraron los datos fijos y la alerta, y se convirtió en el punto de coordinación que comparte el estado entre las vistas |
| Listado de tareas | Mostraba tres tareas mediante marcado repetido y sus botones solo ejecutaban alertas | Se generó desde los datos, recibió por propiedades las acciones y presentó estados diferenciados de carga, error y resultado vacío |
| Resumen | Mostraba una cantidad fija recibida por propiedad | Pasó a mostrar los cuatro contadores que recibe calculados desde la colección y el filtro activo |
| Botón de acción | Ejecutaba una función de alerta sin aportar comportamiento real | Se eliminó y quedó reemplazado por el componente de botón configurable, que ahora se reutiliza en toda la aplicación |
| Estilos | Incluían el contenedor, la tarjeta, el listado y los botones | Se conservaron, se ampliaron con los modificadores que necesitan los componentes nuevos y se limpió la hoja de estilos globales que había dejado el generador |

### Defectos detectados en la base

La revisión del código recibido encontró tres observaciones y las tres quedaron corregidas.

En el archivo de la aplicación se pasaba un título al componente de listado, pero ese componente no recibía ninguna propiedad y escribía el encabezado directamente en el marcado. El dato viajaba sin llegar a destino y hoy el componente recibe la propiedad y la usa.

Este es un defecto que ninguna prueba de comportamiento habría detectado, porque la aplicación se veía igual. El título se mostraba, solo que lo escribía el componente en lugar de recibirlo. Solo una revisión del código muestra que un dato viaja y no llega.

En el archivo de estilos globales quedaban reglas de la plantilla inicial del generador que se contradicen con la identidad visual del proyecto, porque obligaban a que la aplicación se oscureciera cuando el sistema operativo estaba en modo oscuro y fijaban un ancho de contenedor que rompía la composición. Esa limpieza quedó integrada y cerró el último punto pendiente del tutorial 06.

El componente de pie de página que aparece en el tutorial de componentes nunca fue creado en la base entregada. Se añadió como propiedad, siguiendo el mismo patrón de propiedades desestructuradas que el resto de los componentes.

## Limitaciones conocidas

La API que entrega los datos es un servicio público de prueba. Sus operaciones de escritura responden con los códigos de éxito correspondientes, aunque no conservan nada en el servidor. Por ese motivo la aplicación mantiene los cambios en memoria durante la sesión de trabajo y no los conserva al recargar la página, y esta restricción se declara de forma explícita en lugar de presentar la respuesta del servidor como si fuera un almacenamiento permanente.

Insistimos en este punto porque es el más fácil de defraudar sin querer. El servidor responde con un código de éxito a una escritura, y ese código es cierto. Lo que no existe es el dato guardado. Si el enunciado lo hubiera exigido, habríamos necesitado un backend propio, y el propio enunciado dice que no se exige. Lo que sí exige es no presentar esa respuesta como si fuera almacenamiento permanente, y por eso el aviso de creación dice que la tarea queda solo en la sesión.

Las tareas creadas durante la sesión reciben una identidad local propia y se distinguen de las que provienen del servidor. Las operaciones posteriores sobre una tarea creada en la sesión se aplican únicamente sobre el estado local, porque no existe un recurso remoto al que actualizar, y la interfaz informa esa situación en lugar de fingir una sincronización.

La configuración del proyecto mantiene activo el compilador de React, una característica que viene incluida en la base y que optimiza el renderizado de forma automática. Esta optimización no forma parte del contenido de los tutoriales y se conserva tal como fue entregada.

## Entrega

Cada escuadrón debe subir un único archivo de texto al recurso habilitado en Canvas. Su contenido incluye los nombres completos de los integrantes y la dirección del repositorio público.

| Dato | Valor |
| --- | --- |
| Primer integrante | Ignacio Ampuero |
| Segundo integrante | Santiago Herrera |
| Repositorio | <https://github.com/Nemryz/DAW-TaskCampus> |

Todo lo que el enunciado exige está entregado. El proyecto compila, el analizador no reporta observaciones, las tres vistas exigidas funcionan, los cuatro temas de investigación están aplicados y verificados, y la tabla de evidencias documenta cada caso comprobado.

Terminamos con esta idea, que es la que nos costó más aprender. Verificar no es la parte opcional del trabajo, es la parte que nos enseñó lo que no sabíamos.
