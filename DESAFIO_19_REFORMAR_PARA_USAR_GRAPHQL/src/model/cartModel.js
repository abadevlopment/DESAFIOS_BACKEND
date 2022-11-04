import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    products: [{ id: Number, title: String, price: String, category: String, thumbnail: String }]
})

const CartDB = mongoose.model("Cart", CartSchema)

export default CartDB