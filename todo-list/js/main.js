const formulario = document.querySelector("#formu")
const tareasDiv = document.querySelector("#tasks")

eventAgregar()

function eventAgregar() {
    // cuando el usuario agrega una nueva tarea
    formulario.addEventListener("submit", agregarTarea)

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