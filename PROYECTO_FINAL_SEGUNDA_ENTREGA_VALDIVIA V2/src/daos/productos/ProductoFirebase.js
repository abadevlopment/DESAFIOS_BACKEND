const {ContenedorFirebase} = require('../../contenedor')

class ProductoFirebase extends ContenedorFirebase {
    constructor(coleccion) {
        super(coleccion)
    }
}

module.exports = ProductoFirebase