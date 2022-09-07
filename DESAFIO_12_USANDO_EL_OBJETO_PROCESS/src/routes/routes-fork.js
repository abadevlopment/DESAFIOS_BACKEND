const express = require('express')
const { Router } = express
const { randomNumberContainer } = require("../container")
const { fork } = require("child_process")

const routerFork = Router()

routerFork.get("/", (req, res) => {
    console.log("ruta fork");
    console.log(req.query.cant);
    const child = fork("src/api/randomNumber.js")
    child.send(`${req.query.cant}`)
    child.on("message", (msg) => {
        res.send(msg)
    })
})

module.exports = routerFork