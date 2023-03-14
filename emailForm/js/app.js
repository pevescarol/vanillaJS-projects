// 

const email = document.querySelector("#email")
const asunto = document.querySelector("#asunto")
const mensaje = document.querySelector("#mensaje")
const formulario = document.querySelector("#form")

// Asignar eventos

email.addEventListener("blur", validar)
asunto.addEventListener("blur", validar)
mensaje.addEventListener("blur", validar)

// validar entrada al inut

function validar(e){
    if(e.target.value.trim() === ""){
        console.log("No escribiste nada...")
    } else {
        console.log("si hay algo...")
    }
}

