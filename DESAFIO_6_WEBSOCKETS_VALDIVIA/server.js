const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const apiProductos = require('./api/products.js')
const apiMensajes = require('./api/messages.js')
const productos = new apiProductos()
const mensajes = new apiMensajes('mensajes.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

io.on('connection', async (socket) => {
    console.log('Usuario conectado !!!!!!!!!')

    // PRODUCTOS
    socket.emit('productos', productos.getAll())

    socket.on('actualizar', producto => {
        productos.save(producto)
        io.sockets.emit('productos', productos.getAll())
    })
    
    // MENSAJES
    socket.emit('mensajes', await mensajes.getAll())

    socket.on('mensajeNuevo', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajes.save(mensaje)
        io.sockets.emit('mensajes', await mensajes.getAll())
    })
})


const PORT = 8080 || process.env.PORT

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
