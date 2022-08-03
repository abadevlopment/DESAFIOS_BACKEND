const express = require('express')
const { Router } = express

const Controlador = require('../controllers/CarritoControl')

// const {carritoApi, productoApi} = require('../daos')

const routerCarrito = Router()

routerCarrito.get('', Controlador.carritos)

routerCarrito.post('/', Controlador.crear)

routerCarrito.delete('/:id', Controlador.borrarId)

routerCarrito.get('/:id/productos/', Controlador.productosId)

routerCarrito.post('/:id/productos/:id_prod', Controlador.agregarPorId)

routerCarrito.delete('/:id/productos/:id_prod', Controlador.borrarProdPorId)

module.exports = routerCarrito