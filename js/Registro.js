import { Fecha } from "./fecha.js"

export class Registro{
    //vars
    /**Campo HTML del nombre de curso*/
    #nombreCurso = document.getElementById("curso")
    
    /**Campo HTML de fecha inicio*/
    #fechaInicio = document.getElementById("fInicio")

    /**Campo HTML de fecha fin */
    #fechaFin = document.getElementById("fFin")

    /**Campo HTML del aula */
    #aula = document.getElementById("aula")

    /**Almacena el día actual en formato `String`*/
    #hoy = Fecha.getFechaActual()

    /**Almacena el día siguiente al día actual en formato `String`*/
    #manyana = Fecha.sumarFecha(Fecha.convertirFecha(Fecha.getFechaActual()), 1)

    /**Obtiene los registros almacenados en `localStorage` y los convierte en `json`.
     * Si no existen, declara un array vacío.*/
    #registrosActuales = JSON.parse(localStorage.getItem('registros')) || []


    //métodos base
    /**
     * Constructor completo
     * @param {String} nombreCurso el nombre del curso en formato `String`
     * @param {String | Date} fechaInicio la fecha de inicio en formato `String` o `Date`
     * @param {String | Date} fechaFin la fecha de fin en formato `String` o `Date`
     * @param {String} aula el aula correspondiente en formato `String`
     * @returns {Registro} la instancia actual de tipo `Registro`
     */
    constructor(nombreCurso = "", fechaInicio = this.#hoy, fechaFin = this.#manyana, aula = "AT1"){
        this.setNombreCurso(nombreCurso)
        this.setFechaInicio(fechaInicio)
        this.setFechaFin(fechaFin)
        this.setAula(aula)
        return this
    }

    //nombre curso
        /**Devuelve el valor introducido en el campo HTML de nombre curso, en formato `String`
         * @returns {String} nombre de curso en formato `String`
         */
        getNombreCurso = () => this.#nombreCurso.value

        /**Establece el valor del campo HTML de nombre campo
         * @param {String} nombreCurso el nombre del curso en formato `String`
        */
        setNombreCurso = (nombreCurso) => this.#nombreCurso.value = nombreCurso

    //fecha inicio    
        /**Devuelve el valor introducido en el campo HTML de fecha inicio, en formato `Date`
         * @returns {Date} fecha inicio en formato `Date`
         */
        getFechaInicio = () => this.#fechaInicio.value
        /**Establece el valor del campo HTML de fecha inicio
         * @param {Date} fecha la fecha de inicio en formato `Date`
        */
        setFechaInicio = (fecha) => this.#fechaInicio.value = fecha

    //fecha fin
        /**Devuelve el valor introducido en el campo HTML de fecha fin, en formato `Date`
         * @returns {Date} fecha fin en formato `Date`
         */
        getFechaFin = () => this.#fechaFin.value
        
        /**Establece el valor del campo HTML de fecha fin
         * @param {Date} fecha la fecha de fin en formato `Date`
        */        
        setFechaFin = (fecha) => this.#fechaFin.value = fecha
    //aula
        /**Devuelve el valor introducido en el campo HTML de aula, en formato `String`
         * @returns {String} fecha inicio en formato `String`
         */
        getAula = () => this.#aula.value

        /**Establece el valor del campo HTML de aula
         * @param {String} aula el aula en formato `String`
        */    
        setAula = (aula) => this.#aula.value = aula

    
    /**
     * Devuelve los registros actualmente almacenados en `localStorage`
     * @returns {JSON} los registros actuales 
     */
    getRegistrosActuales = () => this.#registrosActuales



    //métodos propios
    /** 
     * Devuelve un objeto con las propiedades correspondientes a cada campo del formulario
     * (nombre del curso, fecha de inicio, fecha de fin, aula)
     * @returns {Object} objeto anónimo con propiedades `nombreCurso`, `fechaInicio`, `fechaFin`, `aula`
    */
        generarRegistro = () => {
        return {
            nombreCurso: this.getNombreCurso(),
            fechaInicio: this.getFechaInicio(),
            fechaFin: this.getFechaFin(),
            aula: this.getAula()
        }
    }

    /**
    * Almacena los datos insertados por el usuario en cada campo del formulario en localStorage
    */
    almacenarDatos = () => {
        const registros = this.getRegistrosActuales()
        registros.push(this.generarRegistro())
        localStorage.setItem('registros', JSON.stringify(registros))
    }


    /**
     * Controla la validación del formulario en base a una serie de cláusulas
     * * Relleno de campos obligatorios (variable `relleno`)
     * * Validación de fechas inicio y fin (variable `validas`)
     * * disponibilidad de las clases en el rango de fecha introducido (variable `libre`)
     * En caso contrario, muestra el mensaje correspondiente a cada error o excepción
     * @returns {boolean} resultado de la validación en formato `boolean` 
     * * Devuelve `true` si TODAS las cláusulas se han cumplido
     * * Devuelve `false` si alguna cláusula es inválida
     */

    validarRegistro = () =>{
        const registroRelleno = this.generarRegistro()
        //CLÁUSULA A - campos obligatorios
            let relleno = true

            //nombre curso
            if(!registroRelleno.nombreCurso || registroRelleno.nombreCurso == ""){
                document.querySelector('.excepcionCurso .obligatorio').classList.remove('invisible')
                relleno = false
            }else{
                document.querySelector('.excepcionCurso .obligatorio').classList.add('invisible')
            }

            //fecha inicio
            if(!registroRelleno.fechaInicio){
                document.querySelector('.excepcionFechaInicio .obligatorio').classList.remove('invisible')
                relleno = false
            }else{
                document.querySelector('.excepcionFechaInicio .obligatorio').classList.add('invisible')
            }

            //fecha fin
            if(!registroRelleno.fechaFin){
                document.querySelector('.excepcionFechaFin .obligatorio').classList.remove('invisible')
                relleno = false
            }else{
                document.querySelector('.excepcionFechaFin .obligatorio').classList.add('invisible')
            }

        //CLÁUSULA B - validación de fechas
            let validas = true

            //fecha inicio
            if(!Fecha.validarFechaInicio(registroRelleno.fechaInicio)){
                document.querySelector('.excepcionFechaInicio .error').classList.remove('invisible')
                validas = false
            }else{
                document.querySelector('.excepcionFechaInicio .error').classList.add('invisible')
            }

            //fecha fin
            if(!Fecha.validarFechaFin(registroRelleno.fechaFin)){
                document.querySelector('.excepcionFechaFin .error').classList.remove('invisible')
                validas = false
            }else{
                document.querySelector('.excepcionFechaFin .error').classList.add('invisible')
            }

        //CLÁUSULA C - clase libre
            let libre = true

            const registros = this.getRegistrosActuales()

            for (let i = 0; i < registros.length; i++) {
                const registro = registros[i]

                if(registro.aula == registroRelleno.aula){
                    if(Fecha.fechaEnRango(registro.fechaInicio, registroRelleno.fechaInicio, registroRelleno.fechaFin) ||
                        Fecha.fechaEnRango(registro.fechaFin, registroRelleno.fechaInicio, registroRelleno.fechaFin)){
                        
                        document.querySelector('.excepcionAula .error').classList.remove('invisible')
                        libre = false
                        break
                    }
                }
            }

            if(libre){
                document.querySelector('.seccion.aulas .error').classList.add('invisible')
            }

        return relleno && validas && libre
    }
}