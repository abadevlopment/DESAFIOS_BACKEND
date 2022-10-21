import express from "express"
import passport from "passport"
import { postRegisterUser, getCreateFindCart } from "../controller/index.js"

const { Router } = express
const routerLogin = Router()

routerLogin.get("/login", (req, res) => {
    res.render("login")
})

routerLogin.post("/login", passport.authenticate("local", { failureRedirect: "/user/login-error" }), (req, res) => {
    res.redirect("/user/home")
})

routerLogin.get("/login-error", (req, res) => {
    res.render("login-error")
})

routerLogin.get("/register", (req, res) => {
    res.render("register")
})

routerLogin.post("/register", postRegisterUser)

routerLogin.get("/home", getCreateFindCart)

routerLogin.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
})

export { routerLogin }