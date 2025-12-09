import { Registro } from "./Registro.js"

export class Datos{
    registro = new Registro()
    
    /**
     * Maneja la exportación de los registros almacenados en localStorage a un archivo de tipo .json
     */
    static exportarJSON = () => {
        const registrosLS = localStorage.getItem('registros')
        const objeto = registrosLS ? JSON.parse(registrosLS) : {}
        const data = JSON.stringify(objeto, null, 4)
        
        const elemento = document.createElement("a")
        const blob = new Blob([data], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        
        elemento.href = url
        elemento.download = "registros.json"
        elemento.click()
        
        URL.revokeObjectURL(url)
    }


    /**
     * Maneja la escritura de los datos correspondientes a los registros a almacenar en localStorage.
     * Es llamado por el método importarJSON.
     * @param {Event} event el evento generador de la acción
     * 
     * Lanza una alerta en función de su resultado.
     */
    static manejoImportar(event){
        const archivo = event.target.files[0]
        if(archivo){
            const lector = new FileReader()
            lector.onload = function(e){
                try {
                    const json = JSON.parse(e.target.result)
                    localStorage.setItem('registros', JSON.stringify(json))

                    alert("Datos importados correctamente!")
                } catch (err) {
                    alert(`ERROR de importación: \n ${err}`)
                }
            }
            lector.readAsText(archivo);
        }
    }

    /**
     * Maneja la importación de registros a localStorage a través de un archivo .json
     */
    static importarJSON = () => {
        const archivo = document.createElement('input')
        archivo.type = 'file'
        archivo.accept = '.json'
        archivo.click()

        
        archivo.addEventListener('change', this.manejoImportar)
    }


    /**Elimina todos los registros almacenados en localStorage.
     * Dispone de un proceso de confirmación para mayor seguridad.
     */
    static resetearLS = () => {
        if(confirm("ADVERTENCIA!\nPresione continuar para eliminar los registros almacenados")){
            localStorage.removeItem('registros')
            alert("Todos los registros han sido eliminados correctamente.")
        }
    }

}



