const fs = require('fs')

class fileSystemContainer {
    constructor(route) {
        this.route = route
    }

    async getAll() {
        try {
            const toRead = await fs.promises.readFile(`${this.route}`, 'utf-8')
            return JSON.parse(toRead, null, 2)
        } catch (error) {
            return { error: `${error}` }
        }
    }

    async save(data) {
        console.log('log container para guardar:');
        console.log(data);
        const toRead = await this.getAll()
        console.log('guardado:');
        console.log(toRead);

        toRead.push(data)

        try {
            await fs.promises.writeFile(`${this.route}` , JSON.stringify(toRead, null, 2))
            return toSave
        } catch (error) {
            return { error: `${error}` }
        }
    }
}

module.exports = fileSystemContainer