const {ContenedorMongo} = require('../../contenedor')

class CarritoMongo extends ContenedorMongo {
    constructor(model) {
        super(model)
    }
}

module.exports = CarritoMongo