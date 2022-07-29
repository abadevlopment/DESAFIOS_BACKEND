const CarritoArchivo = require('./carritos/CarritoArchivo')
const CarritoMemoria = require('./carritos/CarritoMemoria')



const ProductoArchivo = require('./carritos/ProductoArchivo')
const ProductoMemoria = require('./carritos/ProductoMemoria')



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