const express = require('express')
const { Router } = express
const passport = require("passport")
const mongoose = require("mongoose")
const UserDB = require("../models/user.js")
const CartDB = require("../models/carts.js")

const bcrypt = require("bcrypt")
const { URI } = require('../config')
// FAKER ----------------------
const datosFaker = require("../mocks/index")
// LOGS
const logger = require("../logs/logger.js")

const emailServer = require("../mail/mail.js")


// MONGOOSE

mongoose
    .connect(URI)
    // .then(() => console.log("DB conectada"))
    .then(() => { })
    // .catch((err) => console.log(err))
    .catch((err) => logger.error(err))

const routerLogin = Router()

// RUTAS

routerLogin.get("/", (req, res) => {
    // logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    if (req.user) {
        res.redirect("/home")
    } else {
        // console.log(datosFaker);
        res.render("ListaProductos", {
            Products: datosFaker,
            ProductsQty: datosFaker.length
        })
    }
})

routerLogin.get("/login", (req, res) => {
    // logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    res.render("login")
})

routerLogin.post("/login", passport.authenticate("local", { failureRedirect: "/login-error" }), (req, res) => {
    // logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    res.redirect("/home")
})

routerLogin.get("/login-error", (req, res) => {
    // logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    res.render("login-error")
})

routerLogin.get("/register", (req, res) => {
    // logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    res.render("registro")
})

routerLogin.post("/register", (req, res) => {
    // logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    const { username, password, name, adress, age } = req.body
    const fullPhone = req.body.full_phone[0]
    UserDB.findOne({ username }, async (err, user) => {
        if (err) logger.error(err)
        // if (err) console.log(err)
        if (user) res.render("reg-error")
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new UserDB({
                username,
                password: hashedPassword,
                name,
                adress,
                age,
                phone: fullPhone
            })
            // console.log(newUser);
            emailServer(newUser)
            await newUser.save()
            res.redirect("/login")
        }
    })
})

routerLogin.get("/home", async (req, res) => {
    // logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    if (req.user) {
        const userData = await UserDB.findById(req.user._id).lean()
        const userId = req.user._id.valueOf()
        const checkCart = await CartDB.find({ userId: userId })
        if (checkCart.length == 0) {
            const newCart = new CartDB({
                userId: userId
            })
            await newCart.save()
        }
        const userCart = await CartDB.findOne({ userId: userId }).lean()
        const cartProducts = userCart.products

        res.render("home", {
            Name: userData.name,
            Products: datosFaker,
            ProductsQty: datosFaker.length,
            CartProducts: cartProducts,
            CartProductsQty: cartProducts.length
        })
    } else {
        res.redirect("/")
    }

})

routerLogin.get("/logout", (req, res, next) => {
    // logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
})

module.exports = routerLogin