const fs = require('fs')

class Products {
    constructor(route) {
        this.route = route
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
            return search || { error: `producto no encontrado`}
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
            return { error: `producto no encontrado`}
        }
        all.splice(index, 1)

        try {
            await fs.promises.writeFile(`${this.route}`, JSON.stringify(all ,null, 2))
            return { mensaje: `producto borrado`}
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
}

module.exports = Products