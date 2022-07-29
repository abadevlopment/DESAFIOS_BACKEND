const express = require('express')
const { Router } = express

const {carritoApi, productoApi} = require('../daos')

const routerCarrito = Router()

routerCarrito.get('', (req, res) => {
    carritoApi.getAllCarts().then(resp => res.send(resp))
})

routerCarrito.post('/', (req, res) => {
    carritoApi.createCart().then(resp => res.send(resp))
})

routerCarrito.delete('/:id', (req, res) => {
    carritoApi.deleteCartById(req.params.id).then(resp => res.send(resp))
})

routerCarrito.get('/:id/productos', (req, res) => {
    carritoApi.getByIdProducts(req.params.id).then(resp => res.send(resp))
})

routerCarrito.post('/:id/productos/:id_prod', (req, res) => {
    productoApi.getById(req.params.id_prod)
        .then(resp => {
            carritoApi.saveByIdProduct(resp, req.params.id).then(respd => res.send(respd))
        })
})

routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
    carritoApi.deleteByIdProduct(req.params.id, req.params.id_prod).then(resp => res.send(resp))
})

module.exports = routerCarrito