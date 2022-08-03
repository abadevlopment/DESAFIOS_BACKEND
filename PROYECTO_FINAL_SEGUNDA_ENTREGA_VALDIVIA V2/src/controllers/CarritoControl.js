const {carritoApi, productoApi} = require('../daos/index')

const ControladorCarrito = {
    carritos: async (req, res) => {
        try {
            const carros = await carritoApi.getAllCarts()
            res.json(carros)
        } catch (err) {
            console.log(err);
        }
    },
    
    crear: async (req, res) => {
        try {
            const carroCreado = await carritoApi.createCart()
            res.json(carroCreado)
        } catch (err) {
            console.log(err);
        }
    },
    
    borrarId: async (req, res) => {
        try {
            const id = req.params.id
            const carroBorrado = await carritoApi.deleteByIdCart(id)
            res.json(carroBorrado)
        } catch (err) {
            console.log(err);
        }
    },

    productosId: async (req, res) => {
        try {
            const id = req.params.id
            const productosId = await carritoApi.getByIdProducts(id)
            res.json(productosId)
        } catch (err) {
            console.log(err);
        }
    },
    
    agregarPorId: async (req, res) => {
        try {
            const idCarro = req.params.id
            const idProd = req.params.id_prod
            const productosId = await productoApi.getById(idProd)
            const productoGuardado = await carritoApi.saveByIdProduct(productosId, idCarro)
            res.json(productoGuardado)
        } catch (err) {
            console.log(err);
        }
    },
    
    borrarProdPorId: async (req, res) => {
        try {
            const idCarro = req.params.id
            const idProd = req.params.id_prod
            const productoBorrado = await carritoApi.deleteByIdProduct(idCarro, idProd)
            res.json(productoBorrado)
        } catch (err) {
            console.log(err);
        }
    },
    
}

module.exports = ControladorCarrito