const express = require('express')
const { Router } = express
// LOGS
const logger = require("../logs/logger.js")


const info = {
    argumentos: process.argv,
    plataforma: process.platform,
    version: process.versions.node,
    memoria: process.memoryUsage.rss(),
    path: process.execPath,
    id: process.pid,
    carpeta: process.cwd()
}

const routerProcess = Router()

routerProcess.get("/", (req, res) => {
    logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    // res.send(info)
    res.render("info", {
        data: info
    })
})

module.exports = routerProcess