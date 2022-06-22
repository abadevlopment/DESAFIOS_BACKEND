class Products {
    constructor () {
        this.array = []
        this.id = 0
    }

    getAll() {
        return [...this.array]
    }

    getById(id) {
        const result = this.array.find(res => res.id === id)
        return result || { error: 'producto no encontrado'}
    }

    save(product) {
        const add = { ...product, id: ++this.id }
        this.array.push(add)
        return add
    }

    updateById(id, update) {
        const prodUpdate = { id: Number(id), ...update }
        const index = this.array.findIndex(res => res.id === id)
        if (index !== -1) {
            this.array[index] = prodUpdate
            return prodUpdate
        } else {
            return { error: 'producto no encontrado'}
        }
    }

    deleteById(id) {
        const index = this.array.findIndex(res => res.id === id)
        if (index !== -1) {
            const deleteProd = this.array.splice(index, 1)
            return deleteProd
        } else {
            return { error: 'producto no encontrado'}
        }
    }
}

module.exports = Products