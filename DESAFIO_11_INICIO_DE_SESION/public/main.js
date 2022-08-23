const socket = io.connect()

// // PRODUCTOS
// const agregarProducto = document.getElementById("agregarProducto")
// agregarProducto.addEventListener("submit", e => {
//     e.preventDefault()
//     const producto = {
//         title: agregarProducto[0].value,
//         price: agregarProducto[1].value,
//         thumbnail: agregarProducto[2].value
//     }
//     socket.emit("actualizar", producto)
//     agregarProducto.reset()
// })

socket.on("productos", productos => {
    vistaTabla(productos).then(html => {
        document.getElementById("listadoProductos").innerHTML = html
    })
})

function vistaTabla(productos) {
    return fetch("ListaProductos.hbs")
    .then(res => res.text())
        .then(resp => {
            const plantilla = Handlebars.compile(resp)
            // const html = plantilla({ productos })
            const html = plantilla({
                Products: productos,
                ProductsQty: productos.length
            })
            return html
        })
}

// MENSAJES
const inputUsuario = document.getElementById("inputUser")
const inputMensaje = document.getElementById("inputMensaje")
const botonMensaje = document.getElementById("botonEnvio")

const imprimirMensajes = document.getElementById("formMensajes")
imprimirMensajes.addEventListener("submit", e => {
    e.preventDefault()

    const mensaje = {
        author: inputUsuario.value,
        message: inputMensaje.value
    }
    socket.emit("mensajeNuevo", mensaje)
    imprimirMensajes.reset()
    inputMensaje.focus()
})

socket.on("mensajes", mensajes => {
    // console.log("mensaje llega al fromt:");
    // console.log(mensajes);
    const html = contenedorMensajes(mensajes)
    document.getElementById("contenedorMensajes").innerHTML = html
})

function contenedorMensajes(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.author}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.message}</i>
            </div>
        `)
    }).join(" ")
}

inputUsuario.addEventListener("input", () => {
    const correo = inputUsuario.value.length
    const mensaje = inputMensaje.value.length
    inputMensaje.disabled = !correo
    botonMensaje.disabled = !correo || !mensaje
})

inputMensaje.addEventListener("input", () => {
    const mensaje = inputMensaje.value.length
    botonMensaje.disabled = !mensaje
})

// USUARIO

// const loginUser = document.getElementById("loginUser")
// const botonLogin = document.getElementById("botonLogin")

// const imprimirUsusario = document.getElementById("formLogin")
// imprimirUsusario.addEventListener("submit", e => {
//     e.preventDefault()

//     const divUser = document.createElement("div")
//     divUser.className = "mb-3"
//     divUser.id = "usuarioLogueado"
//     imprimirUsusario.replaceWith(divUser)

//     document.getElementById("usuarioLogueado").innerHTML =
//         `<div class="container-fluid" >
//         <h1>Bienvenido ${loginUser.value}</h1>
//         <form>
//         <button type="submit" class="btn btn-warning" id="botonDesLogin">Desloguear</button>
//         </form>
//         </div>`
//     // console.log(loginUser.value);
//     imprimirUsusario.reset()
// })

// const formLogout = document.getElementById("formLogout")
// formLogout.addEventListener("submit", e => {
//     e.preventDefault()

//     function reloadPage(){
//         location.reload(true)
//     }
//     setTimeout(() => {
//         reloadPage
//     }, 5000);
// })