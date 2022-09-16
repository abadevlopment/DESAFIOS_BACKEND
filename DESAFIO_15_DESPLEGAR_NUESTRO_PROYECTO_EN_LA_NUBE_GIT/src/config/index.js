// ENV ----------------------
require("dotenv").config()
const URI = process.env.URI

const fileSystem = {
    messages: './src/db/messages.txt'
}

module.exports = {
    fileSystem,
    URI
}