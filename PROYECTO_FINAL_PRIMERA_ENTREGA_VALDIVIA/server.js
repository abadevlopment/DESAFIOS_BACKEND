const express = require('express')
const routerProduct = require('./routesProducts.js')
const routerCart = require('./routesCarts.js')
const app = express()

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logErrors)
app.use('/api/productos', routerProduct)
app.use('/api/carrito', routerCart)

//RUTA NO IMPLEMENTADA

app.get('*', (req, res) => {
    const error = {
        error: -2,
        descripcion: `ruta '${req.url}' método ${req.method}, no implementada`
    }
    res.send(error)
})

const PORT = 8080 || process.env.PORT

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))