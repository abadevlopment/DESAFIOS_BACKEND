const daoMessage = require('./daoMessage')
const daoNumber = require("./daoNumbers")
const { fileSystem } = require('../config')


const apiMessage = new daoMessage(fileSystem.messages)
const apiNumbers = new daoNumber()

module.exports = {
    apiMessage,
    apiNumbers
}