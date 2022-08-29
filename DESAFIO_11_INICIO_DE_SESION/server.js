// BASICAS ----------------------
const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const { routerLogin } = require("./src/routes")
// VISTAS ----------------------
const path = require("path")
const handlebars = require("express-handlebars")
//COOKIES ----------------------
const session = require("express-session")
// const cookieParser = require("cookie-parser")
// DATABASE ----------------------
const MongoStore = require("connect-mongo")
// const mongoose = require("mongoose")
const UserDB = require("./src/models/user.js")
// PASSPORT ----------------------
const passport = require("passport")
const { Strategy } = require("passport-local")
const LocalStrategy = Strategy
const bcrypt = require("bcrypt")
// FAKER ----------------------
const datosFaker = require("./src/mocks")
// APIS ----------------------
const { apiMessage } = require("./src/daos")
// // ENV ----------------------
// require("dotenv").config()
// const URI = process.env.URI
// CONFIG ----------------------
const { URI } = require('./src/config')

//------------------- MIDDLEWARES -------------------//

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"))

// SESSION

app.use(session({

    store: MongoStore.create({
        mongoUrl: URI,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),

    secret: "secreto",
    resave: true,
    saveUninitialized: false,
    cookie: { expires: 600000 }
}))

// PLANTILLAS

app.set("views", path.join(path.dirname(""), "./src/views"));
app.engine(
    ".hbs",
    handlebars.engine({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        extname: ".hbs",
    })
);
app.set("view engine", ".hbs");

// PASSPORT

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
    UserDB.findOne({ username }, (err, user) => {
        if (err) console.log(err)
        if (!user) return done(null, false)
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) console.log(err)
            if (isMatch) return done(null, user)
            return done(null, false)
        })
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await UserDB.findById(id)
    done(null, user)
})

// RUTAS

app.use("/", routerLogin)

// SOCKET

io.on("connection", async (socket) => {
    console.log("Usuario conectado !!!!!!!!!")

    // PRODUCTOS
    socket.emit("productos", datosFaker)

    // // socket.on("actualizar", async (producto) => {
    // //     mdb.save(producto)
    // //     io.sockets.emit("productos", await mdb.getAll())
    // // })

    // MENSAJES
    socket.emit("mensajes", await apiMessage.getAll())

    socket.on("mensajeNuevo", async (mensaje) => {
        console.log("log mensaje server");
        console.log(mensaje);
        mensaje.fyh = new Date().toLocaleString()
        apiMessage.save(mensaje)
        io.sockets.emit("mensajes", await apiMessage.getAll())
    }
    )
})


// PORT

const PORT = 8080 || process.env.PORT

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
// const server = app.listen(PORT, () => {
//     console.log(`Servidor escuchando en el puerto ${server.address().port}`)
// })
// server.on("error", error => console.log(`Error en servidor ${error}`))