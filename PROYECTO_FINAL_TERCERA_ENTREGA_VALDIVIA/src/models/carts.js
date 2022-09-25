const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    products: [{ id: Number, title: String, price: String, category: String, thumbnail: String }]
})

module.exports = mongoose.model("Carts", UserSchema)