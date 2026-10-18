# TaskCampus

TaskCampus es una aplicación de gestión de tareas académicas construida con React y Vite. La interfaz permite consultar las tareas, crear nuevas, cambiar su estado, editar sus títulos, eliminarlas con confirmación y filtrarlas por estado y por texto.

El proyecto crece sobre una base que el curso entrega y que corresponde al cierre del Tutorial 06. Cada etapa posterior aporta una pieza nueva y este archivo documenta qué se construyó, dónde vive el código y de qué tutorial proviene cada decisión.

## Integrantes

| Nombre | Usuario de GitHub | Responsabilidad |
| --- | --- | --- |
| Ignacio Ampuero | Nemryz | Capa de datos, gancho, servicio y coordinación |
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

El proyecto funciona con cualquier versión de Node superior a 18, dado que React y Vite ya no dependen de versiones antiguas del motor. Las versiones indicadas son las que se usaron para desarrollar y para verificar la entrega.

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

Verificación completa desde una copia limpia, que es la que demuestra que el archivo de bloqueo es coherente con el manifiesto

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
    │   └── NuevaView.jsx
    ├── hooks/
    │   └── useTareas.js          estado y operaciones de las tareas
    └── services/
        └── tareasService.js      comunicación con la API
```

Los componentes reutilizables y las tres vistas ya existen. Lo que falta es el montaje, porque el componente raíz todavía no declara el estado de la vista activa ni conecta los manejadores de escritura, y esa conexión es la última etapa de trabajo.

## Arquitectura en capas

La aplicación separa cuatro responsabilidades que antes se mezclaban en un solo archivo.

| Capa | Responsabilidad | Archivo |
| --- | --- | --- |
| Presentación | Mostrar datos y capturar acciones de la persona | `src/components/` y `src/views/` |
| Coordinación | Mantener el estado compartido y derivar los datos calculados | `src/App.jsx` |
| Lógica de estado | Encapsular el estado de las tareas y las operaciones que lo modifican | `src/hooks/useTareas.js` |
| Comunicación | Realizar las peticiones HTTP y comprobar los resultados | `src/services/tareasService.js` |

Las capas de gancho y de servicio se crearon en la primera etapa y ya están operativas.

## Avance sobre cada tutorial

El trabajo se reparte por capa arquitectónica y no por tutorial completo. Cada integrante asume fragmentos de varios tutoriales y entre ambos cubren los nueve.

Esta decisión responde al orden en que se dependen las piezas. El componente de botón que enseña el tutorial 10 es precisamente el que consume el formulario controlado del tutorial 09. Si el reparto fuera por tutorial completo, el formulario quedaría bloqueado hasta que el otro terminara el 10 y el orden natural de aprendizaje quedaría invertido. Con el reparto por capa cada integrante construye primero lo que necesita para avanzar por su cuenta.

Los tutoriales 08, 09 y 12 aparecen repartidos entre las dos capas. Esa coincidencia no señala un conflicto, señala las costuras donde el estado que produce una capa se convierte en propiedades que consume la otra.

### Estado de cada tutorial

| Tutorial | Hecho | Falta | Responsable | Archivos |
| --- | --- | --- | --- | --- |
| 04 | Proyecto creado con el generador de Vite para React en JavaScript, punto de entrada HTML y montaje en el elemento raíz | Nada | Base entregada | `index.html`, `src/main.jsx` |
| 05 | Componentes separados, propiedades desestructuradas, función recibida como propiedad y eventos con parámetro. Se agregó el componente de pie de página y se corrigió la propiedad que el listado recibía sin usar | Nada | Base entregada y completada por Ignacio | `Header.jsx`, `Footer.jsx`, `TaskSummary.jsx`, `TaskList.jsx` |
| 06 | Estilos externos con modificadores de clase para contenedor, tarjeta, título, listado, tarea y botones, con el alineamiento de los controles resuelto. Se limpió la hoja de estilos globales que había dejado el generador y se forzó el modo claro | Nada | Ignacio | `src/App.css`, `src/index.css` |
| 07 | Estado de la colección en el componente raíz, efecto de montaje, actualización inmutable de objetos y arreglos, y las tres operaciones de escritura contra la API | Identidad dual aplicada a las operaciones y bloqueo de operaciones en curso | Ignacio | `src/App.jsx`, `src/hooks/useTareas.js` |
| 08 | Recorrido de la lista con clave estable, filtros por estado, búsqueda por texto, tres estados de interfaz y los cuatro contadores derivados en el componente raíz | Conectar el filtro y la búsqueda al componente raíz para que la lista deje de recibir siempre la colección completa | Ignacio | `src/App.jsx`, `TaskList.jsx`, `TaskSummary.jsx` |
| 09 | Carga inicial desde la API, encapsulado de toda la lógica en un gancho propio y formulario controlado con validación de títulos | Conectar el formulario al componente raíz para que la creación llegue al gancho | Ignacio | `src/hooks/useTareas.js`, `TaskForm.jsx` |
| 10 | Los cinco componentes reutilizables, la migración de los controles nativos y los estilos asociados | Nada | Santiago | `Button.jsx`, `Badge.jsx`, `Card.jsx`, `Modal.jsx`, `EmptyState.jsx`, `src/App.css` |
| 11 | Servicio con los cuatro verbos, gancho con las tres operaciones de escritura y presentación de los estados de carga, error y resultado vacío | Presentar el aviso de escritura en curso y el aviso de éxito | Ignacio y Santiago | `tareasService.js`, `useTareas.js`, `TaskList.jsx` |
| 12 | Separación entre gancho y servicio, componente de tarea con edición en línea e insignia local pulsable, navegación con los tres valores y las tres vistas | Montar las tres vistas desde el componente raíz y conservar filtros y búsqueda al cambiar de vista | Ignacio | `src/App.jsx`, `src/views/`, `Navigation.jsx` |

### Requisitos y quién los cierra

| Código | Requisito | Responsable | Estado |
| --- | --- | --- | --- |
| RF01 | Cargar las primeras diez tareas desde la API | Ignacio, en N1 | Cerrado y verificado |
| RF02 | Mostrar cada tarea con título, estado y controles, generado desde los datos | Santiago, en H2 | Cerrado, falta el montaje |
| RF03 | Crear tareas mediante un formulario controlado | Santiago, en H3 | Cerrado, falta el montaje |
| RF04 | Validar los títulos al crear y al editar | Santiago, en H3 | Cerrado en la pantalla, falta la conexión |
| RF05 | Alternar entre pendiente y completada | Santiago aporta la pantalla e Ignacio aporta la operación | Cerrado en la pantalla, falta la conexión |
| RF06 | Editar el título en línea | Santiago aporta la pantalla e Ignacio aporta la operación parcial | Falta la actualización parcial en el gancho |
| RF07 | Eliminar con confirmación | Santiago, en H3 | Cerrado en la pantalla, falta la conexión |
| RF08 | Filtrar por todas, pendientes y completadas | Santiago, en H2 | Cerrado en la pantalla, falta el estado del filtro |
| RF09 | Buscar por texto del título | Santiago, en H4 | Cerrado en la pantalla, falta el estado de búsqueda |
| RF10 | Mostrar un resumen actualizado | Santiago, en H2 | Cerrado, los contadores ya se derivan |
| RF11 | Informar carga, errores y resultados vacíos | Ignacio entrega los datos y Santiago las tres pantallas | Cerrado y verificado |
| RF12 | Informar operaciones en curso | Ignacio entrega el estado y Santiago lo refleja en los controles | Falta el conjunto de operaciones en vuelo |
| RF13 | Navegar entre las tres vistas | Santiago aporta los componentes e Ignacio aporta la coordinación | Los componentes existen, falta el montaje |

Varios requisitos se cierran de forma conjunta porque la lógica la aporta una capa y la pantalla la aporta la otra. Ninguno se resuelve con trabajo de una sola persona.

La columna de estado revela un patrón útil para la entrega. Los componentes de pantalla están terminados en su totalidad, mientras que lo que falta está concentrado en una sola pieza, que es el componente raíz. Ese archivo es el único que ninguno de los dos editó de forma paralela y por eso las pantallas quedaron esperando la conexión.


### Investigación y aplicación al proyecto

El enunciado obliga a investigar cuatro temas y a documentar cada uno con su explicación, sus fuentes, los archivos donde se aplicó y un procedimiento para verificarlo. Los cuatro conversan entre sí, porque la separación en vistas que propone el primero es la condición que permite que los otros tres problemas aparezcan y se resuelvan. Dos de ellos ya están terminados y verificados, uno está a medio camino y el último llega con la etapa final de cada integrante.

#### Tema 1. Navegación entre vistas

La biblioteca de enrutamiento solo se menciona al pasar en los tutoriales y nunca llega a desarrollarse, de modo que la primera investigación del proyecto consiste en decidir cómo separar tres vistas sin acudir a ella. La pregunta que guía el trabajo es cómo representar cuál de las vistas está activa, cómo conseguir que un evento del usuario la cambie y cómo seleccionar el componente visible sin provocar la recarga de la aplicación.

La solución se apoya en contenidos que ya se enseñan, es decir el estado, las propiedades, los eventos y el renderizado condicional. El componente raíz declara un estado que guarda la vista activa, se lo entrega junto con una función de cambio al componente de navegación, y a partir de ahí decide cuál de los tres componentes montar. Los controles de navegación entregan únicamente los valores reconocidos por el enunciado, que son resumen, tareas y nueva, de manera que ninguna otra pieza del proyecto necesita conocer la existencia de las vistas.

La evidencia que respalda este tema es un procedimiento de verificación concreto. Consiste en filtrar las tareas por un estado concreto, cambiar de vista y regresar a la anterior para comprobar que tanto la colección como los filtros se conservan intactos.

Como el enunciado no exige rutas de dirección web ni funcionamiento del historial del navegador, esta solución no modifica las dependencias del proyecto y no altera el manifiesto. El estado y el renderizado condicional viven en `src/App.jsx`, mientras que los componentes vivirán en `src/components/Navigation.jsx` y en la carpeta de vistas. La fuente consultada es la documentación oficial de React sobre el estado compartido entre componentes, disponible en react punto dev dentro de la sección que explica cómo compartir el estado entre componentes. Este tema permanece pendiente y corresponde a la última etapa de cada uno de los dos integrantes.

#### Tema 2. Estado derivado

El tutorial 08 introduce los resultados filtrados como datos derivados y el tutorial 12 pide profundizar ese patrón, de modo que la investigación consiste en distinguir con claridad la información que debe guardarse en estado de aquella que puede calcularse a partir de él. La diferencia importa porque guardar en estado un valor que se puede recalcular abre la puerta a que ambas copias se desincronicen sin que nadie lo note.

La aplicación necesita mantener sincronizados los contadores del resumen, los filtros por estado y la búsqueda por texto. La respuesta que se aplicó consiste en calcular todos esos valores a partir de la colección, del filtro activo y del texto escrito, sin conservar ninguna copia independiente de los resultados. El componente de resumen recibe los números ya resueltos desde el componente raíz y nunca los calcula por su cuenta, de manera que la presentación queda aislada de la lógica.

La evidencia se comprueba con operaciones sucesivas. Crear una tarea, cambiar su estado o eliminarla tiene que actualizar el resumen y la lista sin que nadie toque un estado adicional. El proyecto ya cumple esa parte con los cuatro contadores, que se derivan de la colección en cada renderizado, y el efecto que escribe la pestaña del navegador consume el valor ya derivado en lugar de recalcularlo.

Faltan los filtros y la búsqueda, que llegan con la última etapa. El cálculo vive en `src/App.jsx` y la fuente consultada es la documentación oficial de React sobre por qué no siempre hace falta un efecto, disponible en react punto dev dentro de la sección que explica ese criterio.

#### Tema 3. Actualización funcional del estado

El tutorial 12 identifica la forma funcional del setter como tema de investigación, y el motivo del problema es concreto. Cuando el nuevo estado depende del anterior, escribir directamente el valor que se tiene a mano obliga a trabajar con una copia que puede no ser la que React conserva en ese momento, y el resultado es una lista que se actualiza a destiempo o que pierde operaciones encadenadas.

La solución aplicada consiste en entregar siempre una función que recibe el estado vigente, y esa función construye arreglos y objetos nuevos para que React detecte el cambio por identidad. En el proyecto aparece exactamente en las tres operaciones de escritura, y ninguna de ellas pasa la colección directamente. La creación coloca la tarea al principio de un arreglo nuevo, la actualización conserva intactas las demás porque solo reemplaza el objeto cuya identidad coincide con la buscada, y el borrado devuelve un arreglo que ya no contiene esa tarea.

La evidencia consiste en identificar las funciones que emplean el patrón y en comprobar que ninguna se desvía. Se revisó el archivo del gancho y las tres operaciones usan la forma funcional, de modo que la búsqueda de una actualización directa no devuelve resultados. Como ejemplo adicional, el efecto que escribe el título de la pestaña depende del contador derivado y no de la colección, lo que evita recalcular el mismo dato en dos lugares distintos.

Este tema está terminado y verificado, vive en `src/hooks/useTareas.js` y su fuente es la documentación oficial de React sobre el gancho de estado, disponible en react punto dev dentro de la sección de referencia de ese gancho.

#### Tema 4. Identificadores y API simulada

El material de la asignatura aclara que la API de práctica no conserva las escrituras, pero no desarrolla un procedimiento completo para distinguir las identidades locales de los recursos remotos. Esa ausencia es la que se investiga, porque sin una regla clara la aplicación termina con claves duplicadas o modifica una tarea equivocada cuando la persona seleccionó otra.

La regla que se aplicó tiene dos mitades. Cada tarea mantiene una identidad local única y estable que sirve como clave en el recorrido, y conserva por separado la identidad remota cuando existe. Cuando una tarea nace durante la sesión, su identidad remota queda en nulo y las operaciones posteriores se aplican únicamente sobre el estado local, informando a la persona en lugar de fingir una sincronización que no ocurrió.

La evidencia se comprueba creando dos tareas consecutivas y verificando que se distinguen sin repetir clave, y comprobando además que un fallo remoto no altera silenciosamente otra tarea. El proyecto aporta un ejemplo concreto de por qué la identidad remota queda en nulo. La lectura entrega diez tareas cuya identidad del servidor se convierte a texto, de modo que las claves son siempre cadenas y nunca colisionan con las que genera la aplicación. Una tarea creada durante la sesión recibe un prefijo y la hora actual, y la respuesta del servidor a esa creación siempre devuelve el mismo número, que no representa ningún recurso real, por lo que esa respuesta no se conserva.

La construcción de la identidad ocurre en `src/hooks/useTareas.js` y la decisión de omitir la petición remota ocurre en las operaciones de actualizar y eliminar. La insignia que informa que la tarea es local ya existe en el componente de tarea, que la muestra junto al estado. La fuente consultada es la guía oficial del simulador de API, disponible en jsonplaceholder punto typicode punto com dentro de su sección de guía.

### Tareas asignadas a Santiago

Esta sección es la guía de trabajo de Santiago. Cada tarea trae la referencia del tutorial donde se explica, los códigos de requisito que cierra y la forma en que se comprueba. Las cuatro etapas ya están integradas en la rama principal.

| Etapa | Qué construye | Referencia | Archivos | Estado |
| --- | --- | --- | --- | --- |
| H1 | Botón configurable, insignia, tarjeta, modal y estado vacío, migración de los controles nativos y estilos asociados | Tutorial 10, criterio de organización y reutilización | `Button.jsx`, `Badge.jsx`, `Card.jsx`, `Modal.jsx`, `EmptyState.jsx`, `TaskList.jsx`, `App.css` | Entregada |
| H2 | Recorrido de la lista con clave estable, filtros por estado, contadores en el resumen y los tres estados de interfaz | Tutorial 08, RF02, RF08, RF10, RF11, segundo tema de investigación | `TaskList.jsx`, `TaskSummary.jsx`, `App.css` y borrar `ActionButton.jsx` | Entregada |
| H3 | Formulario controlado con validación, botones de operación y ventana de confirmación del borrado | Tutorial 09 y 11, RF03, RF04, RF05, RF07 | `TaskForm.jsx`, `TaskList.jsx`, `App.css` | Entregada |
| H4 | Edición del título en línea, insignia de tarea local, búsqueda por texto, navegación y las tres vistas | Tutorial 12, RF06, RF09, RF12, RF13, primer tema de investigación | `TaskItem.jsx`, `Navigation.jsx`, `src/views/`, `TaskList.jsx`, `TaskSummary.jsx`, `App.css` | Entregada |

Las cuatro etapas entraron en una sola solicitud de elevación, con cinco commits interiores, uno por cada bloque de trabajo. Eso se aparta del plan original de una solicitud por etapa, aunque el resultado técnico cumple lo pedido y respeta la frontera de archivos.

Respeto de la frontera. Santiago no modificó `src/index.css` ni `src/App.jsx`, salvo un salto de línea final. Esa era una condición expresa del contrato, porque el contrato prohibía tocar el archivo de coordinación.

Cuatro observaciones menores quedan acordadas con él. La primera es que el archivo de la vista nueva se llama `NuevaView.jsx` y el contrato decía `NuevaTareaView.jsx`. La segunda es que la clase de estilo de la insignia local todavía no existe. La tercera es que sus archivos terminan las líneas con punto y coma mientras el resto del proyecto no lo hace. La cuarta es que el botón no declara tipo por defecto, aunque en la práctica el formulario funciona porque el valor por defecto del navegador resulta ser el necesario.

## Etapas de trabajo

Cada etapa se entrega como una rama independiente, se revisa mediante una solicitud de elevación y se integra en la rama principal una vez que compila.

### Etapas de Ignacio

Su responsabilidad es la capa de datos y la coordinación. Estas etapas construyen el servicio, el gancho y el estado compartido que alimentan a la capa de presentación.

| Etapa | Qué resuelve | Requisitos | Archivos que toca | Depende de | Cómo se comprueba |
| --- | --- | --- | --- | --- | --- |
| N1 | Conecta la aplicación con la API, reemplaza las tareas escritas a mano por datos reales y retira las alertas y la cantidad constante | RF01, RF11 | `src/services/tareasService.js`, `src/hooks/useTareas.js`, `src/App.jsx`, `index.html` | Nada, arranca desde la base | La pestaña Network muestra la petición de lectura y la consola muestra diez tareas con título y estado en español |
| N2 | Implementa las operaciones de escritura y refleja cada resultado en el estado sin modificar el valor anterior | RF05 y RF07 en su parte lógica, tercer tema de investigación | `src/services/tareasService.js`, `src/hooks/useTareas.js` | N1 | Los cuatro verbos responden y ninguna actualización pasa el estado directo |
| N3 | Aplica la identidad dual a las operaciones, agrega la actualización parcial y bloquea los controles mientras una operación viaja | RF06 y RF12 en su parte lógica, cuarto tema de investigación | `src/services/tareasService.js`, `src/hooks/useTareas.js` | N2 | Dos tareas creadas seguidas no repiten clave y los controles quedan deshabilitados |
| N4 | Calcula los datos derivados y permite cambiar de vista sin recargar la aplicación | RF09, RF10, RF13 y RF08 en su parte de estado | `src/App.jsx` | N3 | Los filtros sobreviven al cambio de vista y los contadores se recalculan solos |

### Etapas de Santiago

Su responsabilidad es la capa de presentación. Estas etapas construyen los componentes reutilizables, el formulario, la edición en línea y las tres vistas que consumen el estado que produce la otra capa. Las cuatro están integradas y verificadas con el analizador de código.

| Etapa | Qué resuelve | Requisitos | Archivos que toca | Depende de | Cómo se comprueba |
| --- | --- | --- | --- | --- | --- |
| H1 | Construye la base de interfaz reutilizable que todas las etapas posteriores consumen | Criterio de organización y reutilización | `src/components/Button.jsx`, `Badge.jsx`, `Card.jsx`, `Modal.jsx`, `EmptyState.jsx`, `TaskList.jsx`, `src/App.css` | Nada, arranca desde la base | La aplicación sigue blanca con el sistema en modo oscuro y el botón aparece en más de un lugar |
| H2 | Genera la lista a partir de los datos y diferencia los estados de carga, de error y de resultado vacío | RF02, RF08, RF10, RF11, segundo tema de investigación | `src/components/TaskList.jsx`, `src/components/TaskSummary.jsx`, `src/App.css` y borrar `src/components/ActionButton.jsx` | N1 | Diez tareas reales en pantalla, la consola sin avisos de clave y la búsqueda de alertas sin resultados |
| H3 | Agrega el formulario controlado con validación e integra la confirmación de borrado | RF03, RF04, RF05 y RF07 en su parte de pantalla | `src/components/TaskForm.jsx`, `src/components/TaskList.jsx`, `src/App.css` | N2 | Un título vacío no guarda y avisa, cancelar el borrado conserva la tarea y los contadores bajan al confirmar |
| H4 | Permite editar el título en línea, buscar por texto y cambiar entre las tres vistas | RF06, RF09, RF12, RF13, primer tema de investigación | `src/components/TaskItem.jsx`, `src/components/Navigation.jsx`, `src/views/`, `src/components/TaskList.jsx`, `src/components/TaskSummary.jsx`, `src/App.css` | N4 | La búsqueda ignora mayúsculas, un título vacío revierte al anterior y las tres vistas conservan tareas y filtros |

Dentro de cada etapa el orden queda fijado por las dependencias de la tabla. En un sprint donde ambos trabajan, la etapa de Ignacio se integra primero porque el archivo de coordinación es suyo, y la de Santiago se integra después de actualizar su rama.

## Metodología y contrato de integración

El desarrollo se organiza con un esquema próximo a Scrum, adaptado a un equipo de dos personas y a un alcance académico con fecha de entrega.

### Por qué se dividió el trabajo en etapas

El enunciado reúne nueve tutoriales que, por separado, parecen contenidos manejables. Al combinarlos producen una aplicación completa con capa de datos, capa de comunicación, capa de presentación, navegación y persistencia en memoria. Abandonar ese conjunto a dos personas tendría un riesgo que no es la falta de esfuerzo sino la dispersión, porque cada uno intentaría abarcar la totalidad del alcance y ambos chocarían en los mismos archivos.

La división por capa evita ese problema porque acota el terreno de cada uno. Ignacio se ocupa de producir y mantener el estado, Santiago se ocupa de mostrarlo e interactuar con él, y entre los dos existe una frontera nítida de archivos donde ninguno edita lo del otro. Esa frontera reduce los conflictos de integración a un número casi nulo, ya que los únicos puntos de contacto son las propiedades que cada uno define y entrega.

### Por qué se dividió en etapas pequeñas y verificables

Cada etapa responde a un conjunto concreto de requisitos, ocupa un número acotado de archivos y se puede comprobar sin necesidad de terminar el proyecto. Esa granularidad reproduce el ciclo central de Scrum, donde cada incremento debe producir algo verificable en lugar de acumular trabajo a ciegas.

El beneficio es doble. Por un lado, si una etapa falla, el error queda contenido en pocos archivos y se localiza rápido. Por otro lado, el historial de commits deja de ser un registro informal y pasa a ser la evidencia del método, porque cada commit corresponde a un incremento con propósito, alcance y resultado verificable.

### Por qué se trabaja con ramas, revisiones y fusiones

La rama principal es el punto de referencia que el docente revisa, que se clona para la verificación de reproducibilidad y que el enunciado exige que funcione sin pedir permisos. Si todo el desarrollo ocurriera directamente sobre ella, cualquier error intermedio dejaría el repositorio en un estado que no compila y que no se puede revisar.

La rama de trabajo resuelve ese problema porque aísla cada etapa. La solicitud de elevación introduce una revisión antes de integrar, de modo que el otro integrante comprueba que la etapa compila, que respeta la frontera de archivos y que cierra los requisitos que dice servir. La fusión, por último, reintegra el trabajo únicamente cuando está verificado.

De esa manera la rama principal permanece compilable en todo momento, la integración ocurre de forma continua en lugar de concentrarse en una fusión grande al final, y el historial registra el recorrido completo del proyecto con una etapa por commit. Además, si una etapa se alarga o se estropea, la rama se descarta sin afectar nada porque ese trabajo todavía no se integró.

### Cómo avanzó el trabajo de Ignacio

Ignacio desarrolló las dos primeras etapas. En la primera creó el archivo de servicio que se comunica con el servidor y el archivo de gancho que encierra todo el estado de las tareas, conectó el componente raíz con ese gancho y corrigió el documento de entrada para declarar el idioma y el título correctos. También retiró la alerta del navegador y el botón de acción que solo servía para invocarla, y reemplazó la cantidad fija por el largo real de la colección.

El componente de listado recibió desde ese momento la colección junto con los dos avisos de la interfaz, aunque todavía no los utiliza. Esa anticipación tiene un propósito concreto, porque deja escrita en el archivo del padre la firma que Santiago necesita construir, de modo que no tenga que deducirla ni quedarse esperando una definición.

El modelo de datos quedó resuelto en esa primera etapa y no en una posterior. Cada tarea viaja con una identidad local de tipo texto que sirve como clave en el recorrido, una identidad del servidor que puede ser nula y una bandera que indica si esa tarea existe realmente en el servidor. Tomar esa decisión en ese momento evitó tener que renombrar campos más adelante y permitió que las etapas siguientes trabajaran sobre un contrato estable.

En la segunda etapa agregó las tres operaciones de escritura al servicio y al gancho, y todas usan la forma funcional del setter. Dos decisiones de esa etapa merecen registrarse. La primera es que la respuesta del servidor a la creación no se conserva, porque el simulador devuelve siempre la misma identidad y esa respuesta no representa ningún recurso. La segunda es que las operaciones de actualizar y eliminar averiguan si la tarea existe en el servidor antes de llamar al servicio, de manera que una tarea creada durante la sesión se modifica solo en el estado local y nunca se le asigna un recurso remoto que no existe.

La tercera entrega limpió la hoja de estilos globales, que era el último punto pendiente del tutorial 06. Ese archivo traía una paleta violeta, un bloque completo de modo oscuro y un ancho fijo de contenedor que rompía la composición. Al limpiarlo se declaró la escala de azules, se eliminaron las reglas que la plantilla había dejado y se forzó el modo claro, porque el valor automático tornaba oscura la interfaz en equipos con tema oscuro. El tamaño base de la aplicación se conservó a propósito, dado que toda la escala de medidas relativas depende de ese valor.

### Contrato de integración

Este apartado define qué archivos puede tocar cada uno, qué recibe cada componente y qué devuelve el gancho, de modo que ninguno tenga que deducir nada.

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
| `TaskList` | `title` de tipo texto, `tareas` de tipo colección, `cargando` de tipo booleano y `error` de tipo texto o nulo | Ya entregadas en `src/App.jsx` |
| `TaskSummary` | `total`, `completadas`, `pendientes` y `mostradas` de tipo número, y `filtroActual` de tipo texto | Las cuatro numéricas ya se entregan y `filtroActual` llega con la etapa N4 |
| `Button` | `label`, `onClick`, `variant`, `disabled` y `type` | Santiago las define en H1 |
| `Badge` | `texto` | Santiago la define en H1 |
| `Card` | `titulo` y `children` | Santiago las define en H1 |
| `Modal` | `visible`, `mensaje`, `onConfirmar` y `onCancelar` | Santiago las define en H1 |
| `EmptyState` | `icono` y `mensaje` | Santiago las define en H1 |
| `TaskForm` | `onAgregar`, `creando`, `error` y `exito` | Santiago las define en H3 |
| `TaskItem` | `tarea`, `enOperacion`, `onAlternar`, `onEditar` y `onEliminar` | Santiago las define en H4 |
| `Navigation` | `vistaActiva` y `onCambiarVista` | Santiago las define en H4 |

#### Qué devuelve el gancho de tareas

| Elemento | Tipo | Para qué sirve |
| --- | --- | --- |
| `tareas` | colección | La lista que se dibuja en pantalla |
| `cargando` | booleano | Distingue la carga inicial del contenido definitivo |
| `error` | texto o nulo | Muestra el motivo del fallo sin fingir una lista vacía |
| `crearTarea` | función | Crea una tarea y la coloca al principio de la colección |
| `actualizarTarea` | función | Cambia campos de una tarea y usa la identidad local para localizarla |
| `eliminarTarea` | función | Borra una tarea y avisa si el servidor rechaza la operación |
| `enOperacion` | conjunto de identidades | Permite deshabilitar los controles mientras una operación viaja |

Las tres operaciones de escritura ya están listas y todavía nadie las invoca desde la interfaz, porque los componentes que las consumen llegan en las etapas H3 y H4. El punto exacto donde se montará la ventana de confirmación ya está señalado con comentarios dentro de `src/App.jsx`.

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

| Elemento recibido | Estado con el que llegó | Qué se hizo |
| --- | --- | --- |
| Aplicación raíz | Entregaba una cantidad fija de tareas, ejecutaba una alerta y componía toda la vista en un solo archivo | Se le retiraron los datos fijos y la alerta, y se convirtió en el punto de coordinación que comparte el estado entre las vistas |
| Listado de tareas | Mostraba tres tareas mediante marcado repetido y sus botones solo ejecutaban alertas | Dejará de contener marcado escrito a mano para generarse desde los datos, recibir por propiedades las acciones y presentar estados diferenciados de carga, error y resultado vacío |
| Resumen | Mostraba una cantidad fija recibida por propiedad | Pasará a mostrar los cuatro contadores que ya recibe calculados desde la colección y el filtro activo |
| Botón de acción | Ejecutaba una función de alerta sin aportar comportamiento real | Se eliminó y quedó reemplazado por el componente de botón configurable, que ahora se reutiliza en toda la aplicación |
| Estilos | Incluían el contenedor, la tarjeta, el listado y los botones | Se conservaron, se ampliaron con los modificadores que necesitan los componentes nuevos y se limpió la hoja de estilos globales que había dejado el generador |

### Defectos detectados en la base

La revisión del código recibido encontró tres observaciones, dos de las cuales ya se corrigieron y la tercera está asignada.

En el archivo de la aplicación se pasaba un título al componente de listado, pero ese componente no recibía ninguna propiedad y escribía el encabezado directamente en el marcado. El dato viajaba sin llegar a destino y hoy se corrige, de modo que el componente recibe la propiedad y la usa.

En el archivo de estilos globales quedaban reglas de la plantilla inicial del generador que se contradicen con la identidad visual del proyecto, porque obligaban a que la aplicación se oscureciera cuando el sistema operativo estaba en modo oscuro y fijaban un ancho de contenedor que rompía la composición. Esa limpieza está asignada y es la única parte pendiente del tutorial 06.

El componente de pie de página que aparece en el tutorial de componentes nunca fue creado en la base entregada. Se añadió como propiedad, siguiendo el mismo patrón de propiedades desestructuradas que el resto de los componentes.

## Limitaciones conocidas

La API que entrega los datos es un servicio público de prueba. Sus operaciones de escritura responden con los códigos de éxito correspondientes, aunque no conservan nada en el servidor. Por ese motivo la aplicación mantiene los cambios en memoria durante la sesión de trabajo y no los conserva al recargar la página, y esta restricción se declara de forma explícita en lugar de presentar la respuesta del servidor como si fuera un almacenamiento permanente.

Las tareas creadas durante la sesión reciben una identidad local propia y se distinguen de las que provienen del servidor. Las operaciones posteriores sobre una tarea creada en la sesión se aplican únicamente sobre el estado local, porque no existe un recurso remoto al que actualizar, y la interfaz informa esa situación en lugar de fingir una sincronización.

La configuración del proyecto mantiene activo el compilador de React, una característica que viene incluida en la base y que optimiza el renderizado de forma automática. Esta optimización no forma parte del contenido de los tutoriales y se conserva tal como fue entregada.

## Entrega

Cada escuadrón debe subir un único archivo de texto al recurso habilitado en Canvas. Su contenido incluye los nombres completos de los integrantes y la dirección del repositorio público.

| Dato | Valor |
| --- | --- |
| Primer integrante | Ignacio Ampuero |
| Segundo integrante | Santiago Herrera |
| Repositorio | <https://github.com/Nemryz/DAW-TaskCampus> |

Las secciones de vistas, pruebas y evidencias se completan al finalizar la implementación, porque deben reflejar el comportamiento real del proyecto y no una descripción anticipada.
