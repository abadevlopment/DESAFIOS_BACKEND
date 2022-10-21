// import express from "express"
import cluster from "cluster"
import { MODE } from "./src/config/index.js"
import os from "os"

const numCPUs = os.cpus().length

import app from "./src/middleware/index.js"


if (MODE === "cluster") {
    if (cluster.isPrimary) {
        // logger.info(`num cpus: ${numCPUs}`);
        // logger.info(`Primary PID: ${process.pid}`);
        console.log("num cpus:", numCPUs);
        console.log("Primary PID:", process.pid);

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on("exit", (worker) => {
            // logger.info(`Worker finalizó ${new Date().toLocaleString()}`);
            console.log(`Worker finalizó ${new Date().toLocaleString()}`);
            cluster.fork();
        });
    } else {
        const PORT = process.env.PORT || 8080

        const server = app.listen(PORT, () => {
            // logger.info(`Servidor escuchando en el puerto ${server.address().port} - PID ${process.pid}`)
            console.log(`Servidor escuchando en el puerto ${server.address().port} - PID ${process.pid}`)
        })
        server.on("error", error => console.log(`Error en servidor: ${error}`))
        // server.on("error", error => logger.error(`Error en servidor: ${error}`))

    }
} else {
    // PORT
    const PORT = process.env.PORT || 8080

    const server = app.listen(PORT, () => {
        // logger.info(`Servidor escuchando en el puerto ${server.address().port}`)
        // logger.info('http://localhost:' + server.address().port)
        console.log(`Servidor escuchando en el puerto ${server.address().port}`)
        console.log('http://localhost:' + server.address().port)
    })
    server.on("error", error => console.log(`Error en servidor: ${error}`))
    // server.on("error", error => logger.error(`Error en servidor: ${error}`))
}