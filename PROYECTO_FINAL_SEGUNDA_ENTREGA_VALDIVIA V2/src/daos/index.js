const ProductoMemoria = require('./productos/ProductoMemoria')
const ProductoArchivo = require('./productos/ProductoArchivo')
const ProductoMongo = require('./productos/ProductoMongo')
const ProductoFirebase = require('./productos/ProductoFirebase')


const CarritoMemoria = require('./carritos/CarritoMemoria')
const CarritoArchivo = require('./carritos/CarritoArchivo')
const CarritoMongo = require('./carritos/CarritoMongo')
const CarritoFirebase = require('./carritos/CarritoFirebase')


require('dotenv').config()

// DB ARCHIVO
const {archivo} = require('../config/index')

// DB MONGODB
const SchemaProducto = require('../models/producto')
const SchemaCarrito = require('../models/carrito')

// DB FIREBASE
const {firebase} = require('../config/index')

const DataBase = {
    memoria: {
        productoApi: new ProductoMemoria(),
        carritoApi: new CarritoMemoria()
    },
    archivo: {
        productoApi: new ProductoArchivo(archivo.productos),
        carritoApi: new CarritoArchivo(archivo.carritos)
    },
    mongo: {
        productoApi: new ProductoMongo(SchemaProducto),
        carritoApi: new CarritoMongo(SchemaCarrito)
    },
    firebase: {
        productoApi: new ProductoFirebase(firebase.productos),
        carritoApi: new CarritoFirebase(firebase.carritos)
    }
}

// console.log(DataBase);

const Select = process.env.DB_SELECCIONADA

// console.log(Select);
// console.log(DataBase[Select]);

const {carritoApi, productoApi} = DataBase[Select]

module.exports = { carritoApi, productoApi } 