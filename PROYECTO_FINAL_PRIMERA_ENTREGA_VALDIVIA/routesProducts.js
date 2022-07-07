const express = require('express')
const { Router } = express

const apiProductos = require('./api/products.js')
const productos = new apiProductos('./api/products.txt')

const routerProduct = Router()

// ADMINISTRADOR
const administrador = true

routerProduct.get('', (req, res) => {
    productos.getAll().then(resp => res.send(resp))
})

routerProduct.get('/:id', (req, res) => {
    productos.getById(req.params.id).then(resp => res.send(resp))
})

routerProduct.post('/', (req, res) => {
    if (administrador) {
        productos.save(req.body).then(resp => res.send(resp))
    } else {
        res.send({
            error: -1,
            descripcion: `ruta '/api/productos${req.url}' método ${req.method}, no autorizada`
        })
    }
})

routerProduct.put('/:id', (req, res) => {
    if (administrador) {
        productos.updateById(req.body, req.params.id).then(resp => res.send(resp))
    } else {
        res.send({
            error: -1,
            descripcion: `ruta '/api/productos${req.url}' método ${req.method}, no autorizada`
        })
    }
})

routerProduct.delete('/:id', (req, res) => {
    if (administrador) {
        productos.deleteById(req.params.id).then(resp => res.send(resp))
    } else {
        res.send({
            error: -1,
            descripcion: `ruta '/api/productos${req.url}' método ${req.method}, no autorizada`
        })
    }
})


module.exports = routerProduct