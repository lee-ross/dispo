
import { Fecha } from "./fecha.js"
import { Registro } from "./Registro.js"


/**
 * Gestiona el tratamiento correspondiente a la vista principal del programa (plano de plantas) en función de la fecha seleccionada
 */
export class VistaFecha{
    //vars
    /**Elemento HTML del popup de información de las clases*/
    #hover = document.getElementById('popup')

    /**Todos los elementos HTML de la clase `.clase` en formato `NodeList`*/
    clases = document.querySelectorAll('.clase')

    /**
     * Obtiene los registros actuales y actualizados cada vez que es llamado.
     * En caso de no existir, devuelve un Array vacío
     * @returns {Array<Object>} los registros actuales en formato `Array<Object>`.
     */
    get registros(){
        return JSON.parse(localStorage.getItem('registros')) || []
    }

    //métodos base
    /**
     * constructor vacío
     * @returns {VistaFecha} la instancia de VistaFecha
     */
    constructor(){
        return this
    }

    /**
     * Imprime los registros almacenados en la consola.
     * Método usado para testing.
     */
    imprimirRegistros = () => {
        console.log(this.registros)
    }


    //métodos pintura
    /**
     * Resetea la apariencia y comportamiento de los elementos clase:
     * * establece el color fondo de las clases a `libres` 
     * * elimina los comportamientos `onmouseenter` y `onmouseleave` definidos para el tratamiento del popup
     * * esconde todos los popups
     */
    reset = () =>{
        this.clases.forEach(elemento =>{
            elemento.classList.remove('ocupada')
            elemento.classList.add('libre')
            elemento.onmouseenter = null
            elemento.onmouseleave = null
        })
        this.esconderHover()
    }

    /**
     * Define la apariencia y comportamiento de las clases ocupadas en base a una fecha tratada
     * * establece el color fondo de las clases ocupadas a `ocupada`
     * * asigna los comportamientos `onmouseenter` y `onmouseleave` para la gestión del popup
     * 
     * @param {String | Date} fechaObtenida la fecha a referenciar en formato `String` o `Date`
     */
    pintarElementos = (fechaObtenida) => {
        this.reset()
        for (let i = 0; i < this.clases.length; i++) {
            const clase = this.clases[i]
            for (let j = 0; j < this.registros.length; j++) {
                const registro = this.registros[j];
                if(registro.aula == clase.dataset.aula){
                    if(Fecha.fechaEnRango(fechaObtenida, registro.fechaInicio, registro.fechaFin)){
                        clase.classList.remove('libre')
                        clase.classList.add('ocupada')

                        clase.onmouseenter = (e) => this.verHover(e, registro)
                        clase.onmouseleave= () => this.esconderHover()
                        break
                    }
                }
            }
        }
    }

    /**
     * Construye la ventana de popup vista al pasar el ratón sobre un elemento clase específico
     * @param {Event} event el evento generado (`onmouseenter` o `onmouseleave`) 
     * @param {*} registro el registro perteneciente a la clase generadora del evento
     */
    verHover = (event, registro) =>{
        this.#hover.innerHTML = `
            <strong>${registro.nombreCurso}</strong> <br>
            ${registro.fechaInicio}<br>
            ${registro.fechaFin}
        `
        const rect = event.target.getBoundingClientRect()
        this.#hover.style.top = `${rect.top + rect.height/2 - 5}px`
        this.#hover.style.left = `${rect.left + rect.width/2 - 5}px`

        this.#hover.style.width = `${rect.width}px`
        this.#hover.style.height = `${rect.height}px`

        this.#hover.classList.remove('invisible')
    }

    /**
     * Esconde la ventana del popup
     */
    esconderHover = () => {
        this.#hover.classList.add('invisible')
    }
}

/**
 * Gestiona el tratamiento correspondiente a la vista del formulario
 */
export class VistaFormulario{
    //vars

    /**Todos los elementos HTML de la clase `.formulario` en formato `NodeList` (sólo uno)*/
    #ventanaFormulario = document.querySelectorAll('.formulario')

    /**Todos los elementos HTML de la clase `.main` en formato `NodeList`*/
    #ventanaPrincipal = document.querySelectorAll('.main')

    /**Objeto de tipo `Registro`*/
    registro = new Registro()

    //métodos
    /**
     * Controla la apertura de la ventana del formulario
     * * Resetea la información introducida en el último registro y establece los campos a sus valores por defecto
     * * Habilita la visibilidad de los elementos correspondientes a la vista formulario
     * * Deshabilita la visibilidad de los elementos correspondientes a la vista principal
     */
    verFormulario = () =>{
        this.registro = new Registro()
        this.#ventanaFormulario.forEach(elemento => {
            elemento.classList.remove('invisible')
        })

        this.#ventanaPrincipal.forEach(elemento => {
            elemento.classList.add('invisible')
        })
    }
    
    /**
     * Controla el cierre de la ventana del formulario
     * * Habilita la visibilidad de los elementos correspondientes a la vista principal
     * * Deshabilita la visibilidad de los elementos correspondientes a la vista formulario
     */
    esconderFormulario = () => {
        this.#ventanaFormulario.forEach(elemento => {
            elemento.classList.add('invisible')
        })

        this.#ventanaPrincipal.forEach(elemento => {
            elemento.classList.remove('invisible')
        })
    }
}
