const express = require('express')
const { Router } = express

const apiProductos = require('./api/products.js')
const productos = new apiProductos('./api/products.txt')
const apiCarrito = require('./api/carts.js')
const carrito = new apiCarrito('./api/carts.txt')

const routerCart = Router()

routerCart.get('', (req, res) => {
    carrito.getAllCarts().then(resp => res.send(resp))
})

routerCart.post('/', (req, res) => {
    carrito.createCart().then(resp => res.send(resp))
})

routerCart.delete('/:id', (req, res) => {
    carrito.deleteCartById(req.params.id).then(resp => res.send(resp))
})

routerCart.get('/:id/productos', (req, res) => {
    carrito.getByIdProducts(req.params.id).then(resp => res.send(resp))
})

routerCart.post('/:id/productos/:id_prod', (req, res) => {
    productos.getById(req.params.id_prod)
        .then(resp => {
            carrito.saveByIdProduct(resp, req.params.id).then(respd => res.send(respd))
        })
})

routerCart.delete('/:id/productos/:id_prod', (req, res) => {
    carrito.deleteByIdProduct(req.params.id, req.params.id_prod).then(resp => res.send(resp))
})

module.exports = routerCart