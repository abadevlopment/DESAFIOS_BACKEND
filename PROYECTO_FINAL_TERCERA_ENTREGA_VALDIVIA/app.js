const prods = require("./src/mocks")
// console.log(prods);
const MongoStore = require("connect-mongo")
const { URI } = require("./src/config")
const mongoose = require("mongoose")

mongoose
    .connect(URI)
    // .then(() => console.log("DB conectada"))
    .then(() => { })
    // .catch((err) => console.log(err))
    .catch((err) => logger.error(err))

const prodSch = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    },
})
const prodSchema = mongoose.model("Products", prodSch)

// prodSchema.insertMany(prods)
//     .then(() => { console.log("productos guardados"); })
//     .catch((err) => { console.log(err); })

async function getprods() {
    const productos = await prodSchema.find({})
    console.log(productos);
}

getprods()