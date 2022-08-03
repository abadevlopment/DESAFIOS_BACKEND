const express = require('express')
const { Router } = express

const Controlador = require('../controllers/ProductoControl')

// const {productoApi} = require('../daos')

const routerProducto = Router()

// // ADMINISTRADOR
// const administrador = true

routerProducto.get('', Controlador.productos)

routerProducto.post('/', Controlador.guardar)

routerProducto.get('/:id',Controlador.productoId)

routerProducto.put('/:id',Controlador.actualizar)

routerProducto.delete('/:id',Controlador.borrarId)


module.exports = routerProducto