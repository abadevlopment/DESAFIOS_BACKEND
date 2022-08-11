const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const handlebars = require('express-handlebars')

const cookieParser = require('cookie-parser')
const session = require('express-session')
// FAKER
const datosFaker = require('./src/mocks')
const { apiMessage } = require('./src/daos')

// MONGO ATLAS
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname))

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs'
    })
)
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(cookieParser('secret'))
app.use(session({

    store: MongoStore.create({
        mongoUrl: "mongodb+srv://Manuel:Manuel@cluster0.szoogxy.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: advancedOptions,
    }),

    secret: 'secreto',
    resave: true,
    saveUninitialized: false,
    cookie: { expires: 600000 }
}))

// ROUTES
app.get('', (req, res) => {
    if (req.session.user) {
        res.redirect('/login')
    } else {
        res.sendFile('public/index.html', { root: __dirname })
    }
})

app.post('/login', (req, res) => {
    const { user } = req.body
    req.session.user = user
    res.redirect('/login')
})

app.get('/login', (req, res) => {
    if (req.session.user) {
        const user = req.session.user
        res.render('userLogin.hbs', { user: user })
    } else {
        res.redirect('/')
    }
})

app.get('/logout', (req, res) => {
    if (req.session.user) {
        const user = req.session.user
        res.render('userLogout.hbs', { user: user })
        req.session.destroy((err) => {
            if (err) 
                res.send({ status: "logout failed", body: err });
            // console.log(`sesion destruida`);
        })
    } else {
        res.redirect('/')
    }
})


io.on('connection', async (socket) => {
    console.log('Usuario conectado !!!!!!!!!')

    // PRODUCTOS
    socket.emit('productos', datosFaker)

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
