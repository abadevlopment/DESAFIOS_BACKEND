const options = require('./options/SQLite3')
const knex = require('knex')(options)

const createTableSQL3 = ( async () => {
    try {
        if( await knex.schema.hasTable('messages')) {
            await knex.schema.dropTable('messages')
        }

        await knex.schema.createTable('messages', table => {
            table.increments('id').primary()
            table.string('author').notNullable()
            table.string('fyh').notNullable()
            table.string('message').notNullable()
        })

        console.log('TABLA DE MENSAGES CREADA !!!!!!');

    } catch (err) {
        console.log(err)
    } finally {
        knex.destroy()
    }
})

module.exports = createTableSQL3
