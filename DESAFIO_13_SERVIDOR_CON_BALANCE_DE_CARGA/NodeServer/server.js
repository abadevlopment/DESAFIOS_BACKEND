const cluster = require("cluster")
const express = require("express")
const numCPUs = require("os").cpus().length

const app = express()

const PORT = parseInt(process.argv[2]) || 8080;


if (PORT == 8080) {

    app.get("/", (req, res) => {
        res.send(
            `Servidor express en ${PORT} - <b>PID ${process.pid
            }</b> - ${new Date().toLocaleString()}`
        );
    });

    app.listen(PORT, () => {
        console.log(`Servidor express escuchando en el puerto ${PORT}`);
    });

}

if (PORT == 8081) {
    if (cluster.isPrimary) {
        console.log("num cpus:", numCPUs);
        console.log("Primary PID:", process.pid);

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on("exit", (worker) => {
            console.log(`Worket finalizó ${new Date().toLocaleString()}`);
            cluster.fork();
        });
    } else {
        // const PORT = parseInt(process.argv[2]) || 8080;

        app.get("/api/randoms", (req, res) => {
            const randomNumber = parseInt(Math.random() * 1e7)
            // console.log(randomNumber);
            res.send(
                {
                    "servidor": `Servidor express escuchando en el puerto ${PORT} - PID ${process.pid}`,
                    "num_random": randomNumber,
                    "num_procesadores": numCPUs,
                    "fyh": new Date().toLocaleString()
                }
            );
        });

        app.listen(PORT, () => {
            console.log(
                `Servidor express escuchando en el puerto ${PORT} - PID ${process.pid}`
            );
        });
    }
}

if (PORT !== 8080 && PORT !== 8081) {

    app.get("/api/randoms", (req, res) => {
        const randomNumber = parseInt(Math.random() * 1e7)
        res.send(
            {
                "servidor": `Servidor express (NGINX) escuchando en el puerto ${PORT} - PID ${process.pid}`,
                "num_random": randomNumber,
                "fyh": new Date().toLocaleString()
            })
    })

    app.listen(PORT, () => {
        console.log(`Servidor express (NGINX) escuchando en el puerto ${PORT}`);
    });
}


