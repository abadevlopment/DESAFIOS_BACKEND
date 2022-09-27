// BASICAS -----------------------
const express = require("express")
const compression = require("compression");
const { routerLogin, routerCart } = require("./src/routes")
const cluster = require("cluster")
const numCPUs = require("os").cpus().length
// VISTAS -----------------------
const handlebars = require("express-handlebars")
const path = require("path")
// COOKIES ----------------------
const cookieParser = require('cookie-parser')
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
// CONFIG ----------------------
const { URI, CLUSTER } = require("./src/config")
// LOGS
const logger = require("./src/logs/logger.js")

const app = express()
//------------------- MIDDLEWARES -------------------//

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"))
app.use(compression());

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

// SESSION
app.use(cookieParser('secret'))
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

// PASSPORT

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
    UserDB.findOne({ username }, (err, user) => {
        if (err) logger.error(err)
        // if (err) console.log(err)
        if (!user) return done(null, false)
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) logger.error(err)
            // if (err) console.log(err)
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
app.use("/cart", routerCart)

// RUTA NO IMPLEMENTADA

app.get('*', (req, res) => {
    logger.warn(`ruta '${req.url}' con método ${req.method}, no implementada`);
    const error = {
        error: 1,
        descripcion: `ruta '${req.url}' método ${req.method}, no implementada`
    }
    res.send(error)
})

if (CLUSTER === "true") {
    if (cluster.isPrimary) {
        logger.info(`num cpus: ${numCPUs}`);
        logger.info(`Primary PID: ${process.pid}`);
        // console.log("num cpus:", numCPUs);
        // console.log("Primary PID:", process.pid);

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on("exit", (worker) => {
            logger.info(`Worker finalizó ${new Date().toLocaleString()}`);
            // console.log(`Worker finalizó ${new Date().toLocaleString()}`);
            cluster.fork();
        });
    } else {
        const PORT = process.env.PORT || 8080

        const server = app.listen(PORT, () => {
            logger.info(`Servidor escuchando en el puerto ${server.address().port} - PID ${process.pid}`)
            // console.log(`Servidor escuchando en el puerto ${server.address().port} - PID ${process.pid}`)
        })
        // server.on("error", error => console.log(`Error en servidor: ${error}`))
        server.on("error", error => logger.error(`Error en servidor: ${error}`))

    }
} else {
    // PORT
    const PORT = process.env.PORT || 8080

    const server = app.listen(PORT, () => {
        logger.info(`Servidor escuchando en el puerto ${server.address().port}`)
        // console.log(`Servidor escuchando en el puerto ${server.address().port}`)
        logger.info('http://localhost:' + server.address().port)
        // console.log('http://localhost:' + server.address().port)
    })
    // server.on("error", error => console.log(`Error en servidor: ${error}`))
    server.on("error", error => logger.error(`Error en servidor: ${error}`))
}