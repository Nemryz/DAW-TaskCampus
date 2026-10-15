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

## Reparto del trabajo por tutorial

El trabajo se reparte por capa arquitectónica y no por tutorial completo. Cada integrante asume fragmentos de varios tutoriales y entre ambos cubren los nueve.

Esta decisión responde al orden en que se dependen las piezas. El componente de botón que enseña el tutorial 10 es precisamente el que consume el formulario controlado del tutorial 09. Si el reparto fuera por tutorial completo, el formulario quedaría bloqueado hasta que el otro terminara el 10 y el orden natural de aprendizaje quedaría invertido. Con el reparto por capa cada integrante construye primero lo que necesita para avanzar por su cuenta.

| Tutorial | Parte de Ignacio Ampuero | Parte de Santiago Herrera |
| --- | --- | --- |
| 04 | Nada, el proyecto ya venía creado en la base entregada | Nada, el proyecto ya venía creado en la base entregada |
| 05 | El componente de pie de página con su propiedad y la corrección de la propiedad que el listado recibía sin usar | Nada, la base ya traía los componentes con props y eventos |
| 06 | Nada | La limpieza de los estilos globales que quedaban de la plantilla y el resto de las hojas de estilo |
| 07 | Todo el contenido, con las etapas N1 y N2 | Nada |
| 08 | El cálculo de los datos derivados dentro del componente raíz | El recorrido de la lista, la clave estable y el renderizado condicional |
| 09 | La carga inicial con el efecto de montaje y el encapsulado en el hook | El formulario controlado con su validación |
| 10 | Nada | Todo el contenido, que corresponde a la etapa H1 |
| 11 | El servicio, el hook y las cuatro operaciones contra la API | La presentación de los estados de carga, error y éxito |
| 12 | La coordinación del estado elevado en la aplicación | Las tres vistas y la navegación entre ellas |

Los tutoriales 08, 09 y 12 aparecen en las dos columnas. Esa coincidencia no señala un conflicto, señala las costuras donde el estado que produce uno se convierte en propiedades que consume el otro.

Cada etapa produce un commit propio y cada integrante completa cuatro etapas considerables, sin contar los commits de integración que existen únicamente para que la rama principal siga compilando.

## Etapas de trabajo de cada integrante

Cada etapa se entrega como una rama independiente, se revisa mediante una solicitud de elevación y se integra en la rama principal una vez que compila. La columna de requisitos indica qué puntos del enunciado cierra esa etapa y la última columna describe cómo se comprueba que el trabajo quedó hecho.

### Etapas de Ignacio Ampuero

Su responsabilidad es la capa de datos y la coordinación. Estas etapas construyen el servicio, el hook y el estado compartido que alimentan a la capa de presentación.

| Etapa | Qué resuelve | Requisitos | Archivos que toca | Depende de | Cómo se comprueba |
| --- | --- | --- | --- | --- | --- |
| N1 | Conecta la aplicación con la API, reemplaza las tareas escritas a mano por datos reales y retira las alertas y la cantidad constante | RF01, RF02, RF11 | `src/services/tareasService.js`, `src/hooks/useTareas.js`, `src/App.jsx`, `index.html` | Nada, arranca desde la base | La pestaña Network muestra la petición de lectura y en la consola aparecen diez tareas con título y estado en español |
| N2 | Implementa las cuatro operaciones contra la API y refleja cada resultado en el estado sin modificar el valor anterior | RF03, RF05, RF07, tercer tema de investigación | `src/services/tareasService.js`, `src/hooks/useTareas.js` | N1 | El servicio responde a los cuatro métodos y la búsqueda confirma que ninguna actualización pasa el estado directo |
| N3 | Distingue la identidad local de la identidad remota y bloquea los controles mientras una operación está en curso | RF06 en su parte lógica, RF12, cuarto tema de investigación | `src/hooks/useTareas.js`, `src/App.jsx` | N2 | Dos tareas creadas seguidas no repiten clave y los controles quedan deshabilitados mientras la petición viaja |
| N4 | Calcula los datos derivados y permite cambiar de vista sin recargar la aplicación | RF08, RF09, RF10, RF13, primer y segundo tema de investigación | `src/App.jsx` | N3 | Los filtros sobreviven al cambio de vista y los contadores se recalculan solos |

### Etapas de Santiago Herrera

Su responsabilidad es la capa de presentación. Estas etapas construyen los componentes reutilizables, el formulario, la edición en línea y las tres vistas que consumen el estado que produce la otra capa.

| Etapa | Qué resuelve | Requisitos | Archivos que toca | Depende de | Cómo se comprueba |
| --- | --- | --- | --- | --- | --- |
| H1 | Construye la base de interfaz reutilizable que todas las etapas posteriores consumen | Criterio de organización y reutilización | `src/components/Button.jsx`, `Badge.jsx`, `Card.jsx`, `Modal.jsx`, `EmptyState.jsx`, `src/App.css`, `src/index.css`, `src/components/TaskList.jsx` | Nada, arranca desde la base | La aplicación sigue blanca con el sistema en modo oscuro y el botón aparece en más de un lugar |
| H2 | Genera la lista a partir de los datos y diferencia los estados de carga, de error y de resultado vacío | RF02, RF08, RF10, RF11, segundo tema de investigación | `src/components/TaskList.jsx`, `src/components/TaskSummary.jsx`, `src/App.css` y borra `src/components/ActionButton.jsx` | N1 | Diez tareas reales en pantalla, la consola sin avisos de clave y la búsqueda de alertas sin resultados |
| H3 | Agrega el formulario controlado con validación e integra la confirmación de borrado | RF03, RF04, RF07 | `src/components/TaskForm.jsx`, `src/components/TaskList.jsx`, `src/App.css` | N2 | Un título vacío no guarda y avisa, cancelar el borrado conserva la tarea y los contadores bajan al confirmar |
| H4 | Permite editar el título en línea, buscar por texto y cambiar entre las tres vistas | RF06, RF09, RF12, RF13, primer tema de investigación | `src/components/TaskItem.jsx`, `src/components/Navigation.jsx`, `src/views/`, `src/components/TaskList.jsx`, `src/components/TaskSummary.jsx`, `src/App.css` | N4 | La búsqueda ignora mayúsculas, un título vacío revierte al anterior y las tres vistas conservan tareas y filtros |

Dentro de cada etapa, el orden queda fijado por las dependencias de la tabla. En un sprint donde ambos trabajan, la etapa de Ignacio se integra primero porque el archivo de coordinación es suyo, y la de Santiago se integra después de actualizar su rama.

## Metodología de trabajo

El desarrollo se organiza con un esquema próximo a Scrum, adaptado a un equipo de dos personas y a un alcance académico con fecha de entrega.

### Por qué se dividió el trabajo en etapas

El enunciado reúne nueve tutoriales que, por separado, parecen contenidos manejables. Al combinarlos producen una aplicación completa con capa de datos, capa de comunicación, capa de presentación, navegación y persistencia en memoria. Abandonar ese conjunto a dos personas tendría un riesgo que no es la falta de esfuerzo sino la dispersión, porque cada uno intentaría abarcar la totalidad del alcance y ambos chocarían en los mismos archivos.

La división por capa evita ese problema porque acota el terreno de cada uno. Ignacio se ocupa de producir y mantener el estado, Santiago se ocupa de mostrarlo e interactuar con él, y entre los dos existe una frontera nítida de archivos donde ninguno edita lo del otro. Esa frontera reduce los conflictos de integración a un número casi nulo, ya que los únicos puntos de contacto son las props que cada uno define y entrega.

### Por qué se manifestó en etapas pequeñas y verificables

Cada etapa responde a un conjunto concreto de requisitos, ocupa un número acotado de archivos y se puede comprobar en la pantalla sin necesidad de terminar el proyecto. Esa granularidad reproduce el ciclo central de Scrum, donde cada incremento debe producir algo verificable en lugar de acumular trabajo a ciegas.

El beneficio doble es directo. Por un lado, si una etapa falla, el error queda contenido en tres o cuatro archivos y se localiza rápido. Por otro lado, el historial de commits deja de ser un registro informal y pasa a ser la evidencia del método, porque cada commit corresponde a un incremento con propósito, alcance y resultado verificable.

### Por qué se trabaja con ramas, solicitudes de elevación y fusiones

La rama principal es el punto de referencia que el docente revisa, que se clona para la verificación de reproducibilidad y que el enunciado exige que funcione sin pedir permisos. Si todo el desarrollo ocurriera directamente sobre ella, cualquier error intermedio dejaría el repositorio en un estado que no compila y que no se puede revisar.

La rama de trabajo resuelve ese problema porque aísla cada etapa. La solicitud de elevación introduce una revisión antes de integrar, de modo que el otro integrante comprueba que la etapa compila, que respeta la frontera de archivos y que cierra los requisitos que dice servir. La fusión, por último, reintegra el trabajo únicamente cuando está verificado.

De esa manera la rama principal permanece compilable en todo momento, la integración ocurre de forma continua en lugar de concentrarse en una fusión grande al final, y el historial registra el recorrido completo del proyecto con una etapa por commit. Además, si una etapa se alarga o se estropea, la rama se descarta sin afectar nada porque ese trabajo todavía no se integró.

## Procedimiento de avance por etapas y contrato de integración

### Qué se estableció como procedimiento

Cada etapa se desarrolla en una rama propia y llega a la rama principal mediante una solicitud de elevación que el otro integrante revisa antes de aprobar. El objetivo del procedimiento es que la rama principal permanezca compilable en todo momento, de manera que nadie trabaje sobre un estado roto ni necesite esperar a que el otro termine. Cada etapa responde a un conjunto concreto de requisitos y se comprueba en la pantalla antes de integrarse, con lo cual el historial de commits documenta el recorrido del proyecto y sirve además como evidencia del método.

### Cómo avanzó las etapas de Ignacio Ampuero

Ignacio Ampuero desarrolló la primera etapa del ciclo. Creó el archivo de servicio que se comunica con el servidor y el archivo de gancho que encierra todo el estado de las tareas, conectó el componente raíz con ese gancho y corrigió el documento de entrada para declarar el idioma y el título correctos. Durante esa etapa retiró la alerta del navegador y el botón de acción que solo servía para invocarla, y reemplazó la cantidad fija por el largo real de la colección.

El componente de listado recibió desde ese momento la colección junto con los dos avisos de la interfaz, aunque todavía no los utiliza. Esa anticipación tiene un propósito concreto, porque deja escrita en el archivo del padre la firma que el segundo integrante necesita construir, de modo que no tenga que deducirla ni quedarse esperando una definición.

El modelo de datos quedó resuelto en esa etapa y no en una posterior. Cada tarea viaja con una identidad local de tipo texto que sirve como clave en el recorrido, una identidad del servidor que puede ser nula y una bandera que indica si esa tarea existe realmente en el servidor. Tomar esa decisión en ese momento evitó tener que renombrar campos más adelante y permitió que las etapas siguientes trabajaran sobre un contrato estable.

### Qué beneficios produjo el procedimiento

El procedimiento permitió alcanzar un estado verificable de la aplicación sin esperar al final del proyecto, porque cada etapa se comprobó en la pantalla antes de integrarse. También dejó escrita la frontera entre la capa que produce el estado y la capa que lo muestra, con lo cual el trabajo del segundo integrante arrancó sin depender de la entrega del primero. La ausencia de archivos editados por los dos al mismo tiempo eliminó la posibilidad de conflictos de integración.

### Por qué la etapa siguiente no genera conflictos de integración

La segunda etapa agrega operaciones al archivo de servicio y al archivo de gancho, y no importa ningún componente nuevo. El componente raíz no requiere cambios porque el gancho expone las funciones sin que la aplicación las utilice todavía. Esa separación permite que la rama principal siga compilando y que la revisión se limite a comprobar que el analizador y la compilación pasan, sin necesidad de revisar la capa de presentación.

### Contrato de integración para Santiago Herrera

Santiago Herrera trabaja sobre la capa de presentación y puede avanzar de inmediato, porque la primera etapa ya está integrada y el contrato que necesita está escrito en los archivos del padre.

| Archivo | Puede editarlo | No puede editarlo |
| --- | --- | --- |
| `src/components/` | Santiago Herrera | Ignacio Ampuero |
| `src/views/` | Santiago Herrera | Ignacio Ampuero |
| `src/App.css` | Santiago Herrera | Ignacio Ampuero |
| `src/index.css` | Santiago Herrera | Ignacio Ampuero |
| `src/App.jsx` | Ignacio Ampuero | Santiago Herrera |
| `src/hooks/useTareas.js` | Ignacio Ampuero | Santiago Herrera |
| `src/services/tareasService.js` | Ignacio Ampuero | Santiago Herrera |

#### Propiedades que recibe cada componente

| Componente | Propiedades | Estado |
| --- | --- | --- |
| `TaskList` | `title` de tipo texto, `tareas` de tipo colección, `cargando` de tipo booleano y `error` de tipo texto o nulo | Ya entregadas en `App.jsx` |
| `TaskSummary` | `total`, `completadas`, `pendientes` y `mostradas` de tipo número, y `filtroActual` de tipo texto | Las cuatro numéricas se entregan ahora, `filtroActual` llega con la etapa N4 |
| `Button` | `label`, `onClick`, `variant`, `disabled` y `type` | Santiago las define en H1 |
| `Badge` | `texto` | Santiago la define en H1 |
| `Card` | `titulo` y `children` | Santiago las define en H1 |
| `Modal` | `visible`, `mensaje`, `onConfirmar` y `onCancelar` | Santiago las define en H1 |
| `EmptyState` | `icono` y `mensaje` | Santiago las define en H1 |
| `TaskForm` | `onAgregar`, `creando`, `error` y `exito` | Santiago las define en H3 |
| `TaskItem` | `tarea`, `enOperacion`, `onAlternar`, `onEditar` y `onEliminar` | Santiago las define en H4 |
| `Navigation` | `vistaActiva` y `onCambiarVista` | Santiago las define en H4 |

#### Forma de cada tarea

| Campo | Tipo | Significado |
| --- | --- | --- |
| `idLocal` | texto | Identidad única y estable para la interfaz, se usa como clave en el recorrido |
| `idRemoto` | número o nulo | Identidad en el servidor, nula cuando la tarea se creó durante la sesión |
| `titulo` | texto | Título de la tarea |
| `completada` | booleano | Indica si la tarea está completada |
| `esLocal` | booleano | Indica que la tarea no existe en el servidor |

#### Orden de ejecución

| Etapa | Depende de | Puede empezar |
| --- | --- | --- |
| H1 | Nada | De inmediato |
| H2 | La primera etapa, que ya está integrada | De inmediato |

#### Condiciones que debe cumplir

1. No modificar `src/App.jsx` para pasar propiedades nuevas. Si necesita alguna, la pide y la agrega Ignacio Ampuero.
2. No escribir estilos dentro del marcado, porque el enunciado exige hojas de estilo separadas.
3. No agregar dependencias al proyecto.
4. Recorrer la colección con `tarea.idLocal` como clave y nunca con el índice del arreglo.
5. Eliminar `src/components/ActionButton.jsx` dentro de H2, porque el componente raíz ya dejó de importarlo y nada lo referencia.

#### Compromiso de Ignacio Ampuero

Antes de que H2 se integre, Ignacio Ampuero entrega las cuatro propiedades numéricas del componente resumen con valores provisionales, de modo que Santiago Herrera pueda construirlo una sola vez y con la firma definitiva. Cuando la etapa N4 aterrice, esas propiedades dejan de ser constantes y pasan a calcularse desde la colección y el filtro activo.

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
