const fs = require('fs')

class ContenedorArchivo {
    constructor(route) {
        this.route = route
        // this.id = 0
    }

    async getAll() {
        try {
            const all = await fs.promises.readFile(`${this.route}`, 'utf-8')
            return JSON.parse(all, null, 2)
        } catch (error) {
            return {error: `${error}`}
        }
    }

    async save(product) {
        const all = await this.getAll()
        const newId = all.length == 0 ? 1 : all[all.length-1].id + 1
        const time = Date(Date.now()).toString()
        const save = { ...product, timestamp: time, id: newId}
        // const save = { ...product, timestamp: time, id: ++this.id}
        all.push(save)

        try {
            await fs.promises.writeFile(`${this.route}`, JSON.stringify(all, null, 2))
            return save
        } catch (error) {
            return {error: `${error}`}
        }
    }

    async getById(id) {
        try {
            const Id = parseInt(id)
            const all = await this.getAll()
            const search = all.find(res => res.id === Id)
            return search || { error: `id: ${id} no encontrado`}
        } catch (error) {
            return {error: `${error}`}
        }
    }

    async updateById(product, id) {
        const Id = parseInt(id)
        const all = await this.getAll()
        const index = all.findIndex(res => res.id === Id)
        const data = all[index]
        if (index == -1) {
            return { error: `con se encontro el id ${id}`}
        } else {
            all[index] = { ...product, timestamp: data.timestamp, id: data.id}
            try {
                await fs.promises.writeFile(`${this.route}`, JSON.stringify(all, null, 2))
                return all[index]
            } catch (error) {
                return {error: `${error}`}
            }
        }
    }

    async deleteById(id) {
        const Id = parseInt(id)
        const all = await this.getAll()
        const index = all.findIndex(res => res.id === Id)
        if (index == -1) {
            return { error: `id: ${id} no encontrado`}
        }
        all.splice(index, 1)

        try {
            await fs.promises.writeFile(`${this.route}`, JSON.stringify(all ,null, 2))
            return { mensaje: `borrado`}
        } catch (error) {
            return {error: `${error}`}
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`${this.route}`, JSON.stringify( [], null, 2))
        } catch (error) {
            return {error: `${error}`}
        }
    }

    async getAllCarts() {
        try {
            const all = await fs.promises.readFile(`${this.route}`, 'utf-8')
            return JSON.parse(all, null, 2)
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

    async deleteByIdCart(id) {
        const Id = parseInt(id)
        const all = await this.getAllCarts()
        const index = all.findIndex(res => res.id === Id)
        if (index == -1) {
            return { error: `id: ${id} no encontrado`}
        }
        all.splice(index, 1)

        try {
            await fs.promises.writeFile(`${this.route}`, JSON.stringify(all ,null, 2))
            return { mensaje: `borrado`}
        } catch (error) {
            return {error: `${error}`}
        }
    }

    async getByIdProducts(id) {        
        const Id = parseInt(id)
        const carts = await this.getAllCarts()
        const search = carts.find( res => res.id === Id)
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
        const Id = parseInt(id)
        const carts = await this.getAllCarts()
        const index = carts.findIndex( res => res.id === Id )
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

    async deleteByIdProduct(idCart, idProd) {
        const carts = await this.getAllCarts()
        const cartIndex = carts.findIndex( res => res.id == idCart)
        const prods = carts[cartIndex].productos
        const index = prods.findIndex( res => res.id == idProd)
        
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

module.exports = ContenedorArchivo