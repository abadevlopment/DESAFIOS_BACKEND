const express = require('express')
const { Router } = express
const passport = require("passport")
const mongoose = require("mongoose")
const UserDB = require("../models/user.js")
const bcrypt = require("bcrypt")

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
    if (req.user) {
        res.redirect("/view")
    } else {
        res.redirect("/login")
    }
})

routerLogin.get("/login", (req, res) => {
    res.render("login")
})

routerLogin.post("/login", passport.authenticate("local", { failureRedirect: "/login-error" }), (req, res) => {
    res.redirect("/view")
})

routerLogin.get("/register", (req, res) => {
    res.render("register")
})

routerLogin.post("/register", (req, res) => {
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
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
})

routerLogin.get("/login-error", (req, res) => {
    res.render("login-error")
})

module.exports = routerLogin