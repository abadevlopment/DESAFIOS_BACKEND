class products {
    constructor(array) {
        this.array = array
    }

    async getAll() {
        try {
            const All = this.array
            return All
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const All = this.array
            const Result = All.filter(res => res.id === id)
            if ((Result.length) > 0) {
                return Result
            } else {
                return {error: 'producto no encontrado' }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async save(product) {
        try {
            const All = this.array
            const Id = All.length == 0 ? 1 : All[All.length-1].id + 1 
            const Add = {id: Id, title: product.title, price: product.price, thumbnail: product.thumbnail}
            All.push(Add)
            return Add
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id, changes) {
        try {
            const All = this.array
            const Filter = All.filter( res => res.id === id )
            const Index = All.findIndex( res => res.id === id)
            if ((Filter.length) > 0) {
                const Delete = All.splice(Index,1)
                const Update = {id: id, title: changes.title, price: changes.price, thumbnail: changes.thumbnail}
                All.push(Update)
                return (`Modificado:  ${JSON.stringify(Delete,null,2)} por: ${JSON.stringify(Update,null,2)}`)
            } else {
                return { error: 'producto no encontrado'}
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const All = this.array
            const Index = All.findIndex( res => res.id === id )
            if (Index != -1) {
                const Delete = All.splice(Index, 1)
                return (`Actualizado:  ${JSON.stringify(All,null,2)}  Eliminado el producto: ${JSON.stringify(Delete,null,2)}`)
            } else {
                return { error : 'producto no encontrado' }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = products