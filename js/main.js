/*
APP DE MANEJO DE AULAS / archivo principal
- importación de módulos
- centralización de lógica
*/


import { VistaFormulario, VistaFecha } from "./vistas.js"
import { Registro } from "./Registro.js"
import { Fecha } from "./fecha.js"


//vars
/**Almacena la fecha actual */
const hoy = Fecha.getFechaActual()

/**Establece la fecha seleccionada por defecto a la fecha actual*/
let fechaSeleccionada = hoy

const registro = new Registro()
const vista = new VistaFormulario()
const plantas = new VistaFecha(hoy)


//elementos HTML
const formulario = document.getElementById('formularioGeneral')
const botonAnadirRegistro = document.getElementById('botonAnadir')
const selectorFecha = document.getElementById('selectorFecha')
const botonSeleccionFecha = document.getElementById('submitFecha')
const botonVolver = document.getElementById('botonVolver')

//métodos
/**
 * Maneja la inserción de registros
 * * Valida los campos del formulario según las cláusulas establecidas
 * * Almacena los datos en localStorage
 * * Esconde la vista del formulario
 * * Recarga la vista principal
 * @param {Event} event el evento que causa la acción
 */
const submitFormulario = (event) => {
  event.preventDefault()
  if(registro.validarRegistro()){
    registro.almacenarDatos()
    vista.esconderFormulario()
    plantas.pintarElementos(fechaSeleccionada)
  }
}

/** 
 * Recarga la vista del formulario desde el botón *añadir*
 * @param {Event} event el evento que causa la acción
*/
const anadirRegistro = (event) => {
  event.preventDefault()
  vista.verFormulario()
}

/**
 * Recarga la vista principal según la fecha seleccionada por el usuario
 * @param {Event} event el evento que causa la acción
 */
const elegirFecha = (event) => {
  event.preventDefault()
  fechaSeleccionada = selectorFecha.value
  plantas.pintarElementos(fechaSeleccionada)
}

/**Recarga la vista principal desde el botón *volver**/
const volver = () => {
  vista.esconderFormulario()
  plantas.pintarElementos(fechaSeleccionada)
}

/**Establece la fecha referenciada a la seleccionada por el usuario*/
const almacenarFecha = () => {
  fechaSeleccionada = selectorFecha.value
}



formulario.addEventListener('submit', submitFormulario)
botonAnadirRegistro.addEventListener('click', anadirRegistro)
botonSeleccionFecha.addEventListener('click', elegirFecha)
botonVolver.addEventListener('click', volver)
selectorFecha.addEventListener('change', almacenarFecha)



const onLoad = () => {
  selectorFecha.value = hoy
  fechaSeleccionada = hoy
  plantas.pintarElementos(fechaSeleccionada)
}


document.getElementById('body').onload = onLoad


