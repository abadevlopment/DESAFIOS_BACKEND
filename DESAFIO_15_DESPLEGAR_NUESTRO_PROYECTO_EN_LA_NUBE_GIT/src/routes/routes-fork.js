const express = require('express')
const { Router } = express
const { randomNumberContainer } = require("../container")
const { fork } = require("child_process")
// LOGS
const logger = require("../logs/logger.js")


const routerFork = Router()

routerFork.get("/", (req, res) => {
    logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    // console.log("ruta fork");
    // console.log(req.query.cant);
    const child = fork("src/api/randomNumber.js")
    child.send(`${req.query.cant}`)
    child.on("message", (msg) => {
        res.send(msg)
    })
})

module.exports = routerFork