const formulario = document.querySelector("#formu")
const tareasDiv = document.querySelector("#tasks")
let tareas = []

eventAgregar()

function eventAgregar() {
    // cuando el usuario agrega una nueva tarea
    formulario.addEventListener("submit", agregarTarea)

    // cuando el document esta lsito
    document.addEventListener("DOMContentLoaded", () => {
        tareas = JSON.parse(localStorage.getItem("tareas")) || []

        crearHTML()
    })
}

function agregarTarea(e) {
    e.preventDefault()

    // entrada del input
    const tarea = document.querySelector("#tarea").value
    console.log(tarea)
    
    // si la entrada es vacia
    if(tarea === '') {
        mostrarError("Debes escribir algo :(")
        return //evita que se ejecuten mas lineas de codigo
    }

    const tareaObj = {
        id: Date.now(),
        tarea    // igual a tarea: tarea
    }


    // añadir al arreglo de tareas
    tareas = [...tareas,tareaObj]

    // una vez agregado, crear el html
    crearHTML()

    // reiniciar el formulario
    formulario.reset()
}

// mostrar mensaje de error
function mostrarError(error) {
    const mensajeError =document.createElement("p")
    mensajeError.textContent = error
    mensajeError.classList.add("error")

    // insertar en html
    tareasDiv.appendChild(mensajeError)

    //eliminar mensjae en 3 seg
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}

// mostrar la lista d elos tweets
function crearHTML() {

    limpiarHTML()

    if(tareas.length > 0){
        tareas.forEach(tarea => {

            //agregar boton eliminar
            const btnEliminar = document.createElement("a")
            btnEliminar.classList.add("borrar-tarea")
            btnEliminar.innerText = "X"

            //añadir funcion btn eliminar
            btnEliminar.onclick = () => {
                borrarTarea(tarea.id)
            }

            // crear html
            const li = document.createElement("li")
            li.innerText = `${tarea.tarea}`

            //asignar boton
            li.appendChild(btnEliminar)

            tareasDiv.appendChild(li)
        })
    }
    sincronizarStorage()
}

//agragar tareas actuales al localStorage
function sincronizarStorage() {
    localStorage.setItem("tareas", JSON.stringify(tareas))
}

// limpiar el HTML
function limpiarHTML() {
    while(tareasDiv.firstChild) {
        tareasDiv.removeChild(tareasDiv.firstChild)
    }
}

// eliminar una tarea
function borrarTarea(id) {
    tareas = tareas.filter( tarea => tarea.id !== id)
    crearHTML()
}