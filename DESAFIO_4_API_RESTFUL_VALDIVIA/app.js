const express = require('express')
const router = require('./routes.js')

const app = express()

const PORT = 8080 || process.env.PORT

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
    }

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', router)
app.use(express.static('public'))
app.use(logErrors);

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
