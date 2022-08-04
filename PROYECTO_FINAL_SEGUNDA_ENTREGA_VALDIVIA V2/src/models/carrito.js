const mongoose = require('mongoose')

const carritosCollection = 'carritos'

const carritosSchema = new mongoose.Schema({
    Productos: {type: Array, required: false},
    Timestamp: {type: String, required: true},
    IdCart: {type: Number, required:true}
})

const SchemaCarrito = mongoose.model(
    carritosCollection,
    carritosSchema
)

module.exports = SchemaCarrito