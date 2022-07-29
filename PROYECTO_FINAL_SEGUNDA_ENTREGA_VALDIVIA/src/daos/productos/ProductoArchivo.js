const ContenedorArchivo = require('../../contenedores')

class ProductoArchivo extends ContenedorArchivo {
    constructor(){
        super('productos')
    }
}

module.exports = ProductoArchivo