const fs = require('fs')

class Carts {
    constructor(route) {
        this.route = route
    }

    async getAllCarts() {
        try {
            const carts = await fs.promises.readFile(`${this.route}`, 'utf-8')
            return JSON.parse(carts, null, 2)
        } catch (error) {
            return {error: `${error}`}
        }
    }

    async createCart() {
        const carts = await this.getAllCarts()
        const newId = carts.length == 0 ? 1 : carts[carts.length - 1 ].id + 1
        const time = Date(Date.now()).toString()
        const save = { productos: [], timestamp: time, id: newId}
        carts.push(save)

        try {
            await fs.promises.writeFile(`${this.route}`, JSON.stringify(carts, null, 2))
            return { id_del_carrito: `${newId}`}
        } catch (error) {
            return {error: `${error}`}
        }
    }

    async deleteCartById(id) {
        const carts = await this.getAllCarts()
        const index = carts.findIndex( res => res.id == id )
        if (index == -1) {
            return { error: `carrito no encontrado`}
        }

        carts.splice(index, 1)

        try {
            await fs.promises.writeFile(`${this.route}`, JSON.stringify( carts, null, 2))
            return { Mensaje: `carrito borrado`}
        } catch (error) {
            return {error: `${error}`}
        }
    }

    async getByIdProducts(id) {
        const carts = await this.getAllCarts()
        const search = carts.find( res => res.id == id)
        const prods = search.productos
        
        try {
            if (prods.length > 0) {
                return prods
            } else {
                return `carrito vacio`
            }
            // return prods || { error: `productos no encontrados`}
        } catch (error) {
            return {error: `${error}`} 
        }
    }

    async saveByIdProduct(product, id) {
        const carts = await this.getAllCarts()
        const index = carts.findIndex( res => res.id == id )
        const saveIn = carts[index]
        const array = saveIn.productos

        if (index == -1) {
            return { error: `no se encontro el id: ${id}`}
        }

        array.push(product)

        try {
            await fs.promises.writeFile(`${this.route}`, JSON.stringify( carts, null, 2))
            return saveIn
        } catch (error) {
            return {error: `${error}`}
        }
    }

    async deleteByIdProduct(id, idProd) {
        const carts = await this.getAllCarts()
        // console.log(carts);
        const cartIndex = carts.findIndex( res => res.id == id)
        // console.log(cartIndex);
        const prods = carts[cartIndex].productos
        const index = prods.findIndex( res => res.id == idProd)
        // console.log(index);

        
        if (index == -1) {
            return { error: `producto no encontrado` }
        }

        prods.splice(index, 1)

        try {
            await fs.promises.writeFile(`${this.route}`, JSON.stringify(carts, null, 2))
        } catch (error) {
            return {error: `${error}`}
        }
    }
}

module.exports = Carts