const express = require('express')
const { Router } = express

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
    // res.send(info)
    res.render("info", {
        data: info
    })
})

module.exports = routerProcess