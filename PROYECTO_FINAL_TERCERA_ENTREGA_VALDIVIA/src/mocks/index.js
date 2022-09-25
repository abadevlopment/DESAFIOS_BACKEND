const { faker } = require('@faker-js/faker')
faker.locale = 'es'

const datos = []

for (let i = 0; i < 20; i++) {
    const dato = {
        id: (i + 1),
        title: faker.commerce.product(),
        price: faker.commerce.price(100, 300),
        category: faker.commerce.department(),
        thumbnail: faker.image.abstract(640, 480, true)
    }
    datos.push(dato)
}
// console.log(datos);

module.exports = datos