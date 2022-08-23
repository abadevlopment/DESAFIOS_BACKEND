const daoMessage = require('./daoMessage')
const { fileSystem } = require('../config')


const apiMessage = new daoMessage(fileSystem.messages)

module.exports = {apiMessage}