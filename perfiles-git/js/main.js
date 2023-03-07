// API Github
const API = "https://api.github.com/users/"
let dark = true

// 
const result = document.querySelector(".result")
const form = document.querySelector(".form")
const input = document.querySelector(".form-input")
const notFound = document.querySelector(".not-found")
const themeSwitch = document.querySelector(".theme-switch")
const themeCSS = document.querySelector(".theme-css")
const themeName = document.querySelector(".theme-name")

// imagen random de inicio
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    let num = Math.floor(Math.random() * 3)
    result.innerHTML = `<img src="./img/waiting-${num}.gif" alt="waiting" class="waiting">`
}


// eventlistener Submit
form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Obtener el usuario del input
    const username = input.value.trim()
    if (!username) return
    getUserData(username)
    input.value = ""
})

themeSwitch.addEventListener("click", switchTheme)

// consumir la APi de Github para obtener el suario
async function getUserData(username) {
    try {
        const response = await fetch(API + username)
        if(!response.ok) {
            throw new Error("No se encontró el usuario")
        }

        const data = await response.json()
        //console.log(data)
        showUserData(data)
    } catch(error) {
        console.error("Error", error)
        showNotFound()
    }
}

// Mostrar imagen de not found
function showNotFound() {
    result.innerHTML = `<img src="./img/404.gif" alt="not found" class="not-found">`
}

// Mostrat los datos del usuario
function showUserData(data) {
    const userData = `
            <img src="${data.avatar_url}" class="avatar">

            <h2 class="name">${data.name}</h2>
            <h4 class="joined">Se unió el ${parseDate(data.created_at)}</h4>
            <h5 class="username">${data.login}</h5>
            <p class="bio">${data.bio}</p>

            <section class="stats">
                <p class="repos">Repos</p>
                <p class="followers">Seguidores</p>
                <p class="following">Siguiendo</p>
                <small class="repos">${data.public_repos}</small>
                <small class="followers">${data.followers}</small>
                <small class="following">${data.following}</small>
            </section> <!-- ./stats -->

            <nav class="contact">
                <a href="#" class="link"><i class="fa fa-map-marker-alt"></i>${data.location}</a>
                <a href="#" class="link"><i class="fa fa-twitter"></i>${data.twitter_username}</a>
                <a href="${data.html_url}" class="link"><i class="fa fa-link"></i>Github</a>
                <a href="#" class="link"><i class="fa fa-building"></i>${data.blog}</a>
            </nav> <!-- ./nav -->
    `

    result.innerHTML = userData

    function parseDate(date) {
        let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
        return new Date(date).toLocaleString("es-ES", options)
    }
}


// Tema oscuro/claro
function switchTheme() {
    if(dark) {
        themeCSS.setAttribute("href", "css/light.css")
        themeName.textContent = "Day"
    } else {
        themeCSS.setAttribute("href", "css/dark.css")
        themeName.textContent = "Night"
    }
    dark = !dark
}