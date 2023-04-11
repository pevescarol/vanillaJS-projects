const notesApp = document.getElementById("app") 
const addNoteButton = document.querySelector(".add-note")

// muestro las notas que ya fueron creadas, del localStorage.
obtenerNotas().forEach(note => {
    const noteElement = crearNota(note.id, note.content)
    notesApp.insertBefore(noteElement, addNoteButton)
})

// cuando haga click en el boton agregar
addNoteButton.addEventListener("click", () => agregarNota())

// LocalStorage
function obtenerNotas() {
    return JSON.parse(localStorage.getItem("sn-notes") || "[]")
}
function guardarNotas(notes) {
    localStorage.setItem("sn-notes", JSON.stringify(notes))
}

// Crear notas
function crearNota(id, content) {
    const element = document.createElement("textarea")

    element.classList.add("note")
    element.value = content
    element.placeholder = "Nota vacía!"

    element.addEventListener("change", () => {
        actualizarNota(id, element.value)
    })

    element.addEventListener("dblclick", () => {
        const eliminar = confirm("¿Estas segurx que deseas eliminar la nota?")

        if(eliminar) {
            eliminarNota(id, element)
        }
    })

    return element
}

function agregarNota() {
    const notas = obtenerNotas()
    const notaObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    } 

    const notaItem = crearNota(notaObject.id, notaObject.content)
    notesApp.insertBefore(notaItem, addNoteButton)

    // guardo en el localStorage
    notas.push(notaObject)
    guardarNotas(notas)
}

function actualizarNota(id, newContent) {
    console.log("updating...");
}

function eliminarNota(id, element) {
    console.log("eliminando nota...")
}