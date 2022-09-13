const { fileSystemContainer } = require('../container')

class daoMessage extends fileSystemContainer {
    constructor(route) {
        super(route)
    }
}

module.exports = daoMessage