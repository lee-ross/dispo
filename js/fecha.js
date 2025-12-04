
export class Fecha{
    //vars

        /**
         * *atributo estático*
         * 
         * Almacena la fecha actual como variable estática en formato `String`
        */
        static #fechaActual = new Date().toISOString().split('T')[0] //YYYY-MM-DD

    //métodos

        /**
         * *método estático*
         * 
         * Obtiene la fecha actual en formato YYYY-MM-DD
         * @returns {string} la fecha actual en formato `String`
         */
        static getFechaActual = () => Fecha.#fechaActual

        /**
         * *método estático*
         * 
         * Convierte la representación textual de una fecha en un objeto de tipo `Date` de la misma fecha.
         * @param {string} fecha una representación textual de una fecha
         * @returns {Date} la misma fecha como nuevo objeto de tipo `Date`
         */
        static convertirFecha = (fecha) => new Date(fecha)

        /**
         * *método estático*
         * 
         * Convierte una fecha de tipo `Date` en un `String` de su representación textual de estilo ISO YYYY-MM-DD
         * @param {Date} fecha una representación textual de una fecha
         * @returns {string} la misma fecha em formato `String`
         */
        static convertirISO = (fecha) => fecha.toISOString().split('T')[0]

        /**
         * *método estático*
         * 
         * Realiza la suma de una fecha base y un número de días especificados
         * @param {string|Date} fechaBase la fecha base a tratar
         * @param {number} num cantidad de días a sumar
         * @returns {string} la nueva fecha en formato `String`
         */
        static sumarFecha = (fechaBase, num) => {
            const fecha = Fecha.convertirFecha(fechaBase)
            fecha.setDate(fecha.getDate() + num)
            return Fecha.convertirISO(fecha)
        }

    //validaciones

        /**
         * *método estático*
         * 
         * Valida la fecha de inicio para asegurarse que se encuentra en el presente o futuro.
         * @param {string|Date} fechaInicio la fecha de inicio tratada en formato `String` o `Date`
         * @returns {boolean} el resultado de la validación en formato `boolean`
         */
        static validarFechaInicio = (fechaInicio) => Fecha.convertirFecha(fechaInicio) >= Fecha.convertirFecha(Fecha.getFechaActual())

        /**
         * *método estático*
         * 
         * Valida la fecha de fin para asegurarse que se encuentra en el futuro, como mínimo un día más que el presente.
         * @param {string|Date} fechaFin la fecha final tratada en formato `String` o `Date`
         * @returns {boolean} el resultado de la validación en formato `boolean`
         */
        static validarFechaFin = (fechaFin) => Fecha.convertirFecha(fechaFin) >= Fecha.convertirFecha(Fecha.sumarFecha(Fecha.getFechaActual(), 1))

        /**
         * *método estático*
         * 
         * Indica si una fecha está dentro de un rango establecido de dos fechas, todas de formato `String` o `Date`
         * @param {string|Date} fecha la fecha tratada
         * @param {string|Date} inicio principio del rango temporal
         * @param {string|Date} fin fin del rango temporal
         * @returns {boolean} el resultado de la validación en formato `boolean`
         */
        static fechaEnRango = (fecha, inicio, fin) =>{
            return (Fecha.convertirFecha(fecha) <= Fecha.convertirFecha(fin)) && (Fecha.convertirFecha(fecha) >= Fecha.convertirFecha(inicio))
        }

}