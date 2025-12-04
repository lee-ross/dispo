# DISPO - Gestión de aulas
*Lee Ross | 2025*

Este programa ha sido creado durante mi periodo de prácticas empresariales en la empresa SmartMind (InterPros)

Dispo es una app web destinada a la gestión eficiente de aulas de un centro educativo.
Permite a miembros del comité educativo del mismo consultar la disponibilidad las aulas y asignar nuevos cursos a aquellas que se encuentren libres, optimizando el uso de los espacios.


## Estructura del proyecto
Dispo se divide en 

    dispo/
    ├── css/
        └── style.css   *control de apariencia de la app
    ├── js/
        ├── main.js *implementación principal de lógica
        ├── registro.js *gestión de lógica de registros
        └── fecha.js   *control de apariencia de la app
    └── index.html








### Clase Registro
Se encarga de la gestión de lógica relacionada a los registros.












































## Futuras mejoras
Dispo es una aplicación emergente en constante crecimiento. Otras futuras implementaciones que mejorarán su uso son:

* **Gestión de permisos**. 

    Mediante el uso de credenciales, se podrán establecer diferentes tipos de usuarios, de modo que mientras los gerentes de organización académica podrán modificar y asignar clases, el resto del equipo académico (profesores, ayudantes, etc.) podrán utilizar la aplicación para obtener información sobre los aulas, visualizar el plano del centro o bien conocer sus clases impartidas.

* **Conexión a Base de Datos ajena**.

    Aunque en este proyecto específico el cliente carecía de necesidad de la conexión de una Base de Datos independiente, descartándose por el uso del espacio local del servidor localStorage, en un futuro real sería una solución relevante a implementar, de modo que los registros se almacenarían de manera centralizada, obteniendo el porpio navegador web la información perteneciente a la ocupación de las clases a través de una conexión especializada.

* **Integración de log de

