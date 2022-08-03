const CarritoArchivo = require('./carritos/CarritoArchivo.js')
const CarritoMemoria = require('./carritos/CarritoMemoria.js')



const ProductoArchivo = require('./carritos/ProductoArchivo.js')
const ProductoMemoria = require('./carritos/ProductoMemoria.js')



const DataBase = {
    archivo: {
        carritoApi: new CarritoArchivo(),
        productoApi: new ProductoArchivo()
    },
    memoria: {
        carritoApi: new CarritoMemoria(),
        productoApi: new ProductoMemoria()
    },
}

const dbSelect = process.env.DB_SELECCIONADA

const {carritoApi, productoApi} = DataBase[dbSelect]

module.exports = {carritoApi, productoApi}