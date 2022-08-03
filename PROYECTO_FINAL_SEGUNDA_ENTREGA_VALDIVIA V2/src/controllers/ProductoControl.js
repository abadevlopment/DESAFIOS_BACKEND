const { productoApi } = require('../daos/index')

// ADMINISTRADOR
const administrador = true


const ControladorProducto = {
    productos: async (req, res) => {
        try {
            const productos = await productoApi.getAll()
            res.json(productos)
        } catch (err) {
            console.log(err);
        }
    },

    guardar: async (req, res) => {
        if (administrador) {
            try {
                const productoNuevo = req.body
                await productoApi.save(productoNuevo)
                res.json(productoNuevo)
            } catch (err) {
                console.log(err);
            }
        } else {
            res.send({
                error: -1,
                descripcion: `ruta '/api/productos${req.url}' método ${req.method}, no autorizada`
            })
        }
    },

    productoId: async (req, res) => {
        try {
            const id = req.params.id
            const respuesta = await productoApi.getById(id)
            res.json(respuesta)
        } catch (err) {
            console.log(err);
        }
    },
    
    actualizar: async (req, res) => {
        if (administrador) {
            try {
                const id = req.params.id
                const productoNuevo = req.body
                const respuesta = await productoApi.updateById(productoNuevo, id)
                res.json(respuesta)
            } catch (err) {
                console.log(err);
            }
        } else {
            res.send({
                error: -1,
                descripcion: `ruta '/api/productos${req.url}' método ${req.method}, no autorizada`
            })
        }
    },
    
    borrarId: async (req, res) => {
        if (administrador) {
            try {
                const id = req.params.id
                const respuesta = await productoApi.deleteById(id)
                res.json(respuesta)
            } catch (err) {
                console.log(err);
            }
        } else {
            res.send({
                error: -1,
                descripcion: `ruta '/api/productos${req.url}' método ${req.method}, no autorizada`
            })
        }
    },
    
}

module.exports = ControladorProducto