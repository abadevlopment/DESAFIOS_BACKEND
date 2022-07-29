const fs = require('fs')
const archivo = require('../config')

class ContenedorArchivo {
    constructor(route) {
        this.route = `${archivo.directorio}/${route}.txt`
    }

    async getAll() {
        try {
            const all = await fs.promises.readFile(`${this.route}`, 'utf-8')
            // console.log(all)
            return JSON.parse(all, null, 2)
        } catch (error) {
            return {error: `${error}`}
        }
    }

    async save(product) {
        const all = await this.getAll()
        // console.log(all);
        const newId = all.length == 0 ? 1 : all[all.length-1].id + 1
        const time = Date(Date.now()).toString()
        const save = { ...product, timestamp: time, id: newId}
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
            const all = await this.getAll()
            const search = all.find(res => res.id == id)
            return search || { error: `id: ${id} no encontrado`}
        } catch (error) {
            return {error: `${error}`}
        }
    }

    async updateById(product, id) {
        const all = await this.getAll()
        const index = all.findIndex(res => res.id == id)
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
        const all = await this.getAll()
        const index = all.findIndex(res => res.id == id)
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

    async createCart() {
        const carts = await this.getAll()
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

    async getByIdProducts(id) {
        const carts = await this.getAll()
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
        const carts = await this.getAll()
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

    async deleteByIdProduct(idCart, idProd) {
        const carts = await this.getAll()
        // console.log(carts);
        const cartIndex = carts.findIndex( res => res.id == idCart)
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

module.exports = ContenedorArchivo