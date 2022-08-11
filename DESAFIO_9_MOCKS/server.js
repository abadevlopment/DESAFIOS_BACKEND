const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const datosFaker = require('./src/mocks')
// console.log(datosFaker);

const {apiMessage} = require('./src/daos')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/api/productos-test', (req, res) => {
    res.sendFile('index.html', { root: './public' })
})

io.on('connection', async (socket) => {
    console.log('Usuario conectado !!!!!!!!!')

    // PRODUCTOS
    socket.emit('productos', datosFaker )

    // // socket.on('actualizar', async (producto) => {
    // //     mdb.save(producto)
    // //     io.sockets.emit('productos', await mdb.getAll())
    // // })
    
    // MENSAJES
    socket.emit('mensajes', await apiMessage.getAll())

    socket.on('mensajeNuevo', async (mensaje) => {
        console.log('log mensaje server');
        console.log(mensaje);
        mensaje.fyh = new Date().toLocaleString()
        apiMessage.save(mensaje)
        io.sockets.emit('mensajes', await apiMessage.getAll())
    }
    )
})


const PORT = 8080 || process.env.PORT

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
