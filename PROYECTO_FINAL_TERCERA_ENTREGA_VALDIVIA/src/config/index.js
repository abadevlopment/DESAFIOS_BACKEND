require("dotenv").config()
const URI = process.env.URI
const CLUSTER = process.env.MODE_CLUSTER
const MAIL = process.env.ADMIN_MAIL

module.exports = {
    URI,
    CLUSTER,
    MAIL
}