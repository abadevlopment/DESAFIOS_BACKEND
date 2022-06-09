const express = require('express')
const productos = require('./Manejo_de_Archivos')
const PORT = 8080 || process.env.Port

const app = express()
const Productos = new productos('./Productos.txt')

app.get('/', (req, res) => {
    res.send(
        `<h1>BIENVENIDO AL SERVIDOR DEL DESAFIO SERVIDOR CON EXPRESS</h1>`
    )
})

app.get('/productos', (req, res) => {
    Productos.getAll().then(resp => res.send(resp))
})

app.get('/productoRandom', (req, res) => {
    Productos.getAll().then(resp => res.send(
        resp[Math.floor(Math.random()*resp.length)]
    ))
})


app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto http://localhost:${PORT}`);
})