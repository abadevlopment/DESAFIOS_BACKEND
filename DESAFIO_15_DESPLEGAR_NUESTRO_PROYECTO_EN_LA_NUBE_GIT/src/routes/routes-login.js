const express = require('express')
const { Router } = express
const passport = require("passport")
const mongoose = require("mongoose")
const UserDB = require("../models/user.js")
const bcrypt = require("bcrypt")
// LOGS
const logger = require("../logs/logger.js")

// require("dotenv").config()
// const URI = process.env.URI

const { URI } = require('../config')


// MONGOOSE

mongoose
    .connect(URI)
    .then(() => console.log("DB conectada"))
    .catch((err) => console.log(err))

const routerLogin = Router()

// RUTAS

routerLogin.get("/", (req, res) => {
    logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    if (req.user) {
        res.redirect("/view")
    } else {
        res.redirect("/login")
    }
})

routerLogin.get("/login", (req, res) => {
    logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    res.render("login")
})

routerLogin.post("/login", passport.authenticate("local", { failureRedirect: "/login-error" }), (req, res) => {
    logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    res.redirect("/view")
})

routerLogin.get("/register", (req, res) => {
    logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    res.render("register")
})

routerLogin.post("/register", (req, res) => {
    logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    const { username, password } = req.body
    UserDB.findOne({ username }, async (err, user) => {
        if (err) console.log(err)
        if (user) res.render("reg-error")
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new UserDB({
                username,
                password: hashedPassword
            })
            await newUser.save()
            res.redirect("/login")
        }
    })
})

routerLogin.get("/view", async (req, res) => {
    logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    if (req.user) {
        const userData = await UserDB.findById(req.user._id).lean()
        res.render("vista-final", {
            datos: userData
        })
    } else {
        res.redirect("/login")
    }
})

routerLogin.get("/logout", (req, res, next) => {
    logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
})

routerLogin.get("/login-error", (req, res) => {
    logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    res.render("login-error")
})

module.exports = routerLogin