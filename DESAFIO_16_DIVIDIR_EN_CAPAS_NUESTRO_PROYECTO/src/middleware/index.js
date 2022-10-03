import express from "express"
import compression from "compression"

import path from "path"
import handlebars from "express-handlebars"

import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import { Strategy } from "passport-local"
import bcrypt from "bcrypt"

import MongoStore from "connect-mongo"
import { UserDB } from "../model/index.js"

import { URI } from "../config/index.js"

import { routerLogin, routerBase, routerCart } from "../router/index.js"

const app = express()

const LocalStrategy = Strategy

// MIDDLEWARES

// function ignoreFavicon(req, res, next) {
//     if (req.originalUrl.includes('favicon.ico')) {
//         res.status(204).end()
//     }
//     next();
// }

// app.use(ignoreFavicon)

app.use(function (req, res, next) {
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
        return res.sendStatus(204);
    }
    next();
});

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("public"))
app.use(compression())

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
        // if (err) logger.error(err)
        if (err) console.log(err)
        if (!user) return done(null, false)
        bcrypt.compare(password, user.password, (err, isMatch) => {
            // if (err) logger.error(err)
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

// ROUTES
app.use("/", routerBase)
app.use("/user", routerLogin)
app.use("/cart", routerCart)

app.get('*', (req, res) => {
    console.log(`ruta '${req.url}' con método ${req.method}, no implementada`);
    const error = {
        error: 1,
        descripcion: `ruta '${req.url}' método ${req.method}, no implementada`
    }
    res.send(error)
})

console.log("loaded: middlewares")

export default app