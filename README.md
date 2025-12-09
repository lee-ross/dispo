# DISPO - Gestión de aulas
*Lee Ross | 2025*

Este programa ha sido creado durante mi periodo de prácticas empresariales en la empresa **SmartMind** (InterPros)

**Dispo** es una aplicación web destinada a la gestión eficiente de aulas de un centro educativo. Permite a miembros del comité académico consultar la disponibilidad las aulas y asignar nuevos cursos a aquellas que se encuentren libres, optimizando el uso de los espacios.





Uso de la aplicación
Visualizar disponibilidad: Al abrir la aplicación se muestra el plano de aulas con colores que indican si están libres u ocupadas.

Añadir registro: Pulsar el botón Añadir registro abre el formulario.

Introducir nombre del curso, fechas y aula.

El sistema valida los datos y muestra mensajes de error si es necesario.

Al confirmar, el registro se guarda en localStorage.

Seleccionar fecha: El selector de fecha permite consultar la disponibilidad de aulas en un día concreto.

Exportar/Importar:

Exportar genera un archivo .json con todos los registros.

Importar permite cargar registros desde un archivo externo (actualmente reemplaza los existentes, aunque puede adaptarse para fusionar).

Eliminar registros: El botón Eliminar borra todos los registros almacenados.










## Estructura del proyecto

    dispo/
    ├── css/
        └── style.css  - control de apariencia de la app
    ├── js/
        ├── registro.js  - gestión de lógica de registros y manejo del formulario
        ├── fecha.js  - gestión de fechas
        ├── datos.js  - gestión del almacenamiento en localStorage
        ├── vistas.js  - tratamiento de vistas - principal y formulario
        └── main.js  - implementación centralizada de lógica        
    └── index.html


### Clase Registro *registro.js*
Se encarga de gestionar la lógica relacionada a los registros y el correcto funcionamiento del formulario.

**Funciones clave**:
* Validación de campos obligatorios y errores de lógica temporal y correspondiente modificación de apariencia de la interfaz
* Control del almacenamiento de registros en `localStorage`
* Definición de los datos por defecto de los campos del formulario



### Clase Fecha *fecha.js*
Proporciona utilidades para el manejo correcto de fechas.

**Funciones clave**:
* Obtención de la fecha actual del sistema
* Operaciones de sumas de días
* Conversión bidireccionar entre datos de tipo `Date` y datos de tipo `String` en formato ISO
* Validaciones temporales (de fecha inicio, fin, y dentro de un rango establecido)



### Clase Datos *datos.js*
Se encarga de gestionar los registros almacenados en `localStorage` y su correcto tratamiento.

**Funciones clave**:
* Exportación de registros como archivo de tipo `.json`
* Importación absoluta de registros a partir dee un archivo de tipo `.json`
* Reseteo de `localStorage` por eliminación completa de registros



### Clase VistaFecha *vistas.js*
Se encarga de gestionar la vista principal de la aplicación, perteneciente a los planos de las plantas.

**Funciones clave**:
* Establece el color de las aulas ocupadas y libres en función de la fecha seleccionada
* Control de visualización de la ventana popup informativa (al pasar el cursor sobre un aula ocupada)
* Reseteo de la vista para actualizar la disponibilidad



### Clase VistaFormulario *vistas.js*
Se encarga de gestionar la vista del formulario.

**Funciones clave**:
* Control de visualización de la vista formulario sobre principal y viceversa
* Reseteo de campos con la recarga de la vista



### main.js
Punto de entrada principal y coordinación de la lógica - funciona a modo de controlador

**Funciones clave**:
* Inicialización de la aplicación al cargar la página
* Control de la fecha seleccionada y su inicialización por defecto
* Manejo de eventos para botones y formularios












## Futuras mejoras
Dispo es una aplicación emergente en constante crecimiento. Otras futuras implementaciones que mejorarán su uso son:

* #### Gestión de roles. 

    Mediante el uso de credenciales, se podrán establecer diferentes tipos de usuarios, de modo que mientras los gerentes de organización académica podrán modificar y asignar clases, el resto del equipo académico (profesores, ayudantes, etc.) podrán utilizar la aplicación para obtener información sobre los aulas, visualizar el plano del centro o bien conocer sus clases impartidas.

* #### Conexión a Base de Datos ajena.

    Aunque en este proyecto específico el cliente carecía de necesidad de la conexión de una Base de Datos independiente, descartándose por el uso del espacio local del servidor *localStorage*, en un futuro real sería una solución relevante a implementar, de modo que los registros se almacenarían de manera centralizada, obteniendo el porpio navegador web la información perteneciente a la ocupación de las clases a través de una conexión especializada.

* **Integración de log de

* #### Pequeñas implementaciones.

    * Una vez seleccionada la fecha de inicio, la fecha de fin pasará a ser la del día inmediatamente siguiente (o, en su caso, podría ser relevante el paso al día LECTIVO siguiente)

    * Actualmente sólo es posible realizar una implementación absoluta de datos, de manera que los registros locales se sobreescriben. Podría evaluarse el caso de ofrecer también una importanción aditiva, donde los registros hallados en el archivo referneciado se evaluan frente a los registros locales para evitar su duplicado.

    * 



Gestión de permisos: Diferentes roles de usuario (administradores, docentes, asistentes) con permisos específicos.

Conexión a base de datos externa: Sustituir localStorage por una base de datos centralizada para uso multiusuario.

Integración de logs y auditoría: Registro de acciones realizadas (quién añadió, modificó o eliminó un curso).

Mejoras de usabilidad:

Autocompletar fechas (fin = día siguiente o siguiente lectivo).

Evitar duplicados al importar registros.

Interfaz responsive más avanzada.








## Notas técnicas
* **Tecnologías utilizadas**: HTML5, CSS3, JavaScript ES6 y localStorage
* **Compatibilidad**: Navegadores modernos con soporte para E6 y localStorage - ha sido probada correctamente en Microsoft Edge 90+, Google Chrome 90+ y Mozilla Firefox 88+. 
* **Requisitos mínimos**: Conexión mínima estable a internet para su descarga incial - en su versión actual, puede funcionar posteriormente en modo offline al depender únicamente de localStorage.