const ContenedorArchivo = require('../../contenedores/index.js')

class CarritoArchivo extends ContenedorArchivo {
    constructor(fileName){
        super(fileName)
    }
}

module.exports = CarritoArchivo