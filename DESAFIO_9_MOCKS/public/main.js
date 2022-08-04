const socket = io.connect()

// PRODUCTOS
const agregarProducto = document.getElementById('agregarProducto')
agregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: agregarProducto[0].value,
        price: agregarProducto[1].value,
        thumbnail: agregarProducto[2].value
    }
    socket.emit('actualizar', producto)
    agregarProducto.reset()
})

socket.on('productos', productos => {
    vistaTabla(productos).then(html => {
        document.getElementById('listadoProductos').innerHTML = html
    })
})

function vistaTabla(productos) {
    return fetch('ListaProductos.hbs')
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
const inputUsuario = document.getElementById('inputUser')
const inputMensaje = document.getElementById('inputMensaje')
const botonMensaje = document.getElementById('botonEnvio')

const imprimirMensajes = document.getElementById('formMensajes')
imprimirMensajes.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = {
        author: inputUsuario.value,
        message: inputMensaje.value
    }
    socket.emit('mensajeNuevo', mensaje)
    imprimirMensajes.reset()
    inputMensaje.focus()
})

socket.on('mensajes', mensajes => {
    const html = contenedorMensajes(mensajes)
    document.getElementById('contenedorMensajes').innerHTML = html
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

inputUsuario.addEventListener('input', () => {
    const correo = inputUsuario.value.length
    const mensaje = inputMensaje.value.length
    inputMensaje.disabled = !correo
    botonMensaje.disabled = !correo || !mensaje
})

inputMensaje.addEventListener('input', () => {
    const mensaje = inputMensaje.value.length
    botonMensaje.disabled = !mensaje 
})