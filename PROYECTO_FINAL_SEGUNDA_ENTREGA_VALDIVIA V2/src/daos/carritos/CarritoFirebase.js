const {ContenedorFirebase} = require('../../contenedor')

class CarritoFirebase extends ContenedorFirebase {
    constructor(coleccion) {
        super(coleccion)
    }
}

module.exports = CarritoFirebase