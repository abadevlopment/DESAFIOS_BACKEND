const { faker } = require('@faker-js/faker')
faker.locale = 'es'

const datos = []

for (let i = 0; i < 5; i++) {
    const dato = {
        title: faker.commerce.product(),
        price: faker.commerce.price(100, 300),
        thumbnail: faker.image.abstract()
    }
    datos.push(dato)
}

module.exports = datos