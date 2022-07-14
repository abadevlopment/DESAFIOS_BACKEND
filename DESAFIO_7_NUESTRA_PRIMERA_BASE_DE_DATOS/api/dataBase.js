class DataBase {
    constructor(engine, table) {
        this.engine = engine
        this.table = table
    }

    getAll() {
        return this.engine.select().table(this.table)
            .then(
                function (rows) {
                    let result = Object.values(JSON.parse(JSON.stringify(rows)))
                    return result
                }
            )
            .catch( (err) => {
                console.log(err)
                throw err
            })

    }

    save(data) {
        this.engine.insert(data).into(this.table)
            .then(() => console.log('datos insertados'))
            .catch((err => {
                console.log(err)
                throw err
            }))
    }
}

module.exports = DataBase