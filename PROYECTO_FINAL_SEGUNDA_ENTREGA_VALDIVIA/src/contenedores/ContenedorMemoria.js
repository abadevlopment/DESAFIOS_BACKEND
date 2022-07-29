class ContenedorMemoria {
    constructor () {
        this.arrayProd = []
        this.arrayCart = []
        this.id = 0
    }

    getAll() {
        return [...this.arrayProd]
    }
    
    save(product) {
        const add = { ...product, id: ++this.id }
        this.arrayProd.push(add)
        return add
    }

    getById(id) {
        const result = this.arrayProd.find(res => res.id === id)
        return result || { error: 'producto no encontrado'}
    }
    
    updateById(product, id) {
        const prodUpdate = { id: Number(id), ...product }
        const index = this.arrayProd.findIndex(res => res.id === id)
        if (index !== -1) {
            this.arrayProd[index] = prodUpdate
            return prodUpdate
        } else {
            return { error: 'producto no encontrado'}
        }
    }

    deleteById(id) {
        const index = this.arrayProd.findIndex(res => res.id === id)
        if (index !== -1) {
            const deleteProd = this.arrayProd.splice(index, 1)
            return deleteProd
        } else {
            return { error: 'producto no encontrado'}
        }
    }

    deleteAll() {
        return this.arrayProd = []
    }

    getAllCarts() {
        return [...this.arrayCart]
    }

    createCart() {
        const carts = getAllCarts()
        const newId = carts.length == 0 ? 1 : carts[carts.length - 1 ].id + 1
        const time = Date(Date.now()).toString()
        const save = { productos: [], timestamp: time, id: newId}
        this.arrayCart.push(save)
    }

    getByIdProducts(id) {
        const carts = getAllCarts()
        const search = carts.find( res => res.id == id)
        const prods = search.productos

        if (prods.length > 0) {
            return prods
        } else {
            return `carrito vacio`
        }
    }

    saveByIdProduct(product, id) {
        const carts = getAllCarts()
        const index = carts.findIndex( res => res.id == id )
        const saveIn = carts[index]
        const array = saveIn.productos

        if (index == -1) {
            return { error: `no se encontro el id: ${id}`}
        }

        array.push(product)

    }

    deleteByIdProduct(idCart, idProd) {
        const carts = getAllCarts()
        const cartIndex = carts.findIndex( res => res.id == idCart)
        const prods = carts[cartIndex].productos
        const index = prods.findIndex( res => res.id == idProd)

        if (index == -1) {
            return { error: `producto no encontrado` }
        }

        prods.splice(index, 1)
    }
}

module.exports = ContenedorMemoria 