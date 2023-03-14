// 
const emailMsg={
    email: '',
    asunto: '',
    mensaje: ''
}

const email = document.querySelector("#email")
const asunto = document.querySelector("#asunto")
const mensaje = document.querySelector("#mensaje")
const formulario = document.querySelector("#form")
const btnSubmit = document.querySelector("#form button[type=\"submit\"]")
const btnReset = document.querySelector("#form button[type=\"reset\"]")

// Asignar eventos

email.addEventListener("input", validar)
asunto.addEventListener("input", validar)
mensaje.addEventListener("input", validar)

btnReset.addEventListener("click", function(e) {
    e.preventDefault()

    // reiniciar objeto
    emailMsg.email = ''
    emailMsg.asunto = ''
    emailMsg.mensaje = ''

    formulario.reset()
    comprobarEmail()
})

// validar entrada al inut

function validar(e){
    //console.log(e.target.parentElement)
    if(e.target.value.trim() === ""){
        mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
        emailMsg[e.target.name] = ''
        comprobarEmail()
        return  //para detenet el cod
    }

    if(e.target.id === "email" && !validarEmail(e.target.value)) {
        mostrarAlerta("El email no es válido", e.target.parentElement)
        emailMsg[e.target.name] = '' // lo reiniciamos
        comprobarEmail()  // se comprueba el mail
        return
    }
    
    limpiarAlerta(e.target.parentElement)

    // asignar los valores
    emailMsg[e.target.name] = e.target.value.trim().toLowerCase()
    console.log(emailMsg)

    comprobarEmail()
}

// generar alerta en HTML

function mostrarAlerta(msg, refe){
    limpiarAlerta(refe)

    // de esta forma si se escapan los datos y va a generar codigo seguro, en comparsción de innerHTML
    const error = document.createElement("p")
    error.textContent = msg
    error.classList.add("error")


    // agregar el error al formulario
    refe.appendChild(error)

}

function limpiarAlerta(refe){
    // comprobar si ya existe un alerta
    // utilizo el parentElement para que me modifique cada div, en cambio document.querySelector(".error") no es lo mismo para este caso
    const alerta = refe.querySelector(".error")
    if(alerta) {
        alerta.remove()
    }
}

function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    const resultado = regex.test(email)
    return resultado
}

function comprobarEmail() {
    // chequea que todos los campos deben estar llenos
    if(Object.values(emailMsg).includes('')){
        btnSubmit.classList.add("enviar")
        btnSubmit.disabled = true
        return
    }

    btnSubmit.classList.remove("enviar")
    btnSubmit.disabled = false
    
}