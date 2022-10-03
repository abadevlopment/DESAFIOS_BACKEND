import mongoose from "mongoose";
import { CartDB } from "../model/index.js"
import { URI } from "../config/index.js"

mongoose
    .connect(URI)
    .then(() => console.log("DB Cart conectada"))
    // .then(() => { })
    .catch((err) => console.log(err))
// .catch((err) => logger.error(err))

async function findCart(data) {
    const cart = await CartDB.find({ userId: data })
    return cart
}

async function cartProducts(data) {
    const products = await CartDB.findOne({ userId: data }).lean()
    return products
}

async function createCart(data) {
    const newCart = new CartDB({
        userId: data
    })
    return newCart
}

async function saveCart(data) {
    await data.save()
}

export {
    findCart,
    cartProducts,
    createCart,
    saveCart
}