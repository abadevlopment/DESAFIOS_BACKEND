const express = require('express')
const { Router } = express

const {productoApi} = require('../daos')

const routerProducto = Router()

// ADMINISTRADOR
const administrador = true

routerProducto.get('', (req, res) => {
    productoApi.getAll().then(resp => res.send(resp))
})

routerProducto.get('/:id', (req, res) => {
    productoApi.getById(req.params.id).then(resp => res.send(resp))
})

routerProducto.post('/', (req, res) => {
    if (administrador) {
        productoApi.save(req.body).then(resp => res.send(resp))
    } else {
        res.send({
            error: -1,
            descripcion: `ruta '/api/productos${req.url}' método ${req.method}, no autorizada`
        })
    }
})

routerProducto.put('/:id', (req, res) => {
    if (administrador) {
        productoApi.updateById(req.body, req.params.id).then(resp => res.send(resp))
    } else {
        res.send({
            error: -1,
            descripcion: `ruta '/api/productos${req.url}' método ${req.method}, no autorizada`
        })
    }
})

routerProducto.delete('/:id', (req, res) => {
    if (administrador) {
        productoApi.deleteById(req.params.id).then(resp => res.send(resp))
    } else {
        res.send({
            error: -1,
            descripcion: `ruta '/api/productos${req.url}' método ${req.method}, no autorizada`
        })
    }
})


module.exports = routerProducto