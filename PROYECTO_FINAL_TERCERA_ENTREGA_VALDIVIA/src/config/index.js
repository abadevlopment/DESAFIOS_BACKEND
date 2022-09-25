require("dotenv").config()
const URI = process.env.URI
const CLUSTER = process.env.MODE_CLUSTER

module.exports = {
    URI,
    CLUSTER
}