const mongoose = require('mongoose')

const productosCollection = 'productos'

const productosSchema = new mongoose.Schema({
    Nombre: {type: String, required: true},
    Precio: {type: Number, required: true},
    Url: {type: String, required: true},
    Timestamp: {type: String, required: true},
    IdProd: {type: Number, required:true}
})

const SchemaProducto = mongoose.model(
    productosCollection,
    productosSchema
)

module.exports = SchemaProducto