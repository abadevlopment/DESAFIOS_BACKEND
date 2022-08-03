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
        const Id = parseInt(id)
        const result = this.arrayProd.find(res => res.id === Id)
        return result || { error: 'id no encontrado'}
    }
    
    updateById(product, id) {
        const Id = parseInt(id)
        const prodUpdate = { id: Number(Id), ...product }
        const index = this.arrayProd.findIndex(res => res.id === Id)
        if (index !== -1) {
            this.arrayProd[index] = prodUpdate
            return prodUpdate
        } else {
            return { error: 'id no encontrado'}
        }
    }

    deleteById(id) {
        const Id = parseInt(id)
        const index = this.arrayProd.findIndex(res => res.id === Id)
        if (index !== -1) {
            const deleteProd = this.arrayProd.splice(index, 1)
            return deleteProd
        } else {
            return { error: 'producto no encontrado'}
        }
    }

    // deleteAll() {
    //     return this.arrayProd = []
    // }

    getAllCarts() {
        return [...this.arrayCart]
    }

    createCart() {
        const carts = this.arrayCart
        const newId = carts.length == 0 ? 1 : carts[carts.length - 1 ].id + 1
        const time = Date(Date.now()).toString()
        const save = { productos: [], timestamp: time, id: newId}
        this.arrayCart.push(save)
        return save
    }

    deleteByIdCart(id) {
        const Id = parseInt(id)
        const index = this.arrayCart.findIndex(res => res.id === Id)
        if (index !== -1) {
            const deleteProd = this.arrayCart.splice(index, 1)
            return deleteProd
        } else {
            return { error: 'carrito no encontrado'}
        }
    }

    getByIdProducts(id) {
        const Id = parseInt(id)
        const carts = this.arrayCart
        const search = carts.find( res => res.id == Id)
        const prods = search.productos

        if (prods.length > 0) {
            return prods
        } else {
            return `carrito vacio`
        }
    }

    saveByIdProduct(product, id) {
        const Id = parseInt(id)
        const carts = this.arrayCart
        const index = carts.findIndex( res => res.id == Id )
        const saveIn = carts[index]
        const array = saveIn.productos

        if (index == -1) {
            return { error: `no se encontro el id: ${id}`}
        } 

        array.push(product)

    }

    deleteByIdProduct(idCart, idProd) {
        const carts = this.arrayCart
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