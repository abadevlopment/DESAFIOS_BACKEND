const ProductoMemoria = require('./productos/ProductoMemoria')
const ProductoArchivo = require('./productos/ProductoArchivo')



const CarritoMemoria = require('./carritos/CarritoMemoria')
const CarritoArchivo = require('./carritos/CarritoArchivo')



const {archivo} = require('../config/index')

require('dotenv').config()

const DataBase = {
    memoria: {
        productoApi: new ProductoMemoria(),
        carritoApi: new CarritoMemoria()
    },
    archivo: {
        productoApi: new ProductoArchivo(archivo.productos),
        carritoApi: new CarritoArchivo(archivo.carritos)
    }
}

// console.log(DataBase);

const Select = process.env.DB_SELECCIONADA

// console.log(Select);
// console.log(DataBase[Select]);

const {carritoApi, productoApi} = DataBase[Select]

module.exports = { carritoApi, productoApi } 