const {ContenedorMongo} = require('../../contenedor')

class ProductoMongo extends ContenedorMongo {
    constructor(model) {
        super(model)
    }
}

module.exports = ProductoMongo