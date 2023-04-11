const notesApp = document.getElementById("app") 
const addNoteButton = document.querySelector(".add-note")

// muestro las notas que ya fueron creadas, del localStorage.
obtenerNotas().forEach(note => {
    const noteElement = crearNota(note.id, note.content)
    notesApp.insertBefore(noteElement, addNoteButton)
})

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

    return element
}

function actualizarNota(id, newContent) {
    console.log("updating...");
}