import mongoose from "mongoose";
import { ProductDB } from "../model/index.js"
import { URI } from "../config/index.js"

mongoose
    .connect(URI)
    .then(() => console.log("DB Product conectada"))
    // .then(() => { })
    .catch((err) => console.log(err))
// .catch((err) => logger.error(err))

async function getAllProducts() {
    const products = await ProductDB.find({}).lean()
    return products
}

async function findProduct(data) {
    const product = await ProductDB.findOne({ id: data }).lean()
    return product
}

export {
    getAllProducts,
    findProduct
}