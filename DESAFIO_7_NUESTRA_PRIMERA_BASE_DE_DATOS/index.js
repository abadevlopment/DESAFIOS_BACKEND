const createTableMDB = require('./createTableMDB')
const createTableSQL3 = require('./createTableSQL')


    try {
        createTableMDB()
        createTableSQL3()

    } catch (err) {
        console.log(err)
    } 


