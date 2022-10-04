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

function toCart(data1, data2, data3) {
    CartDB.updateOne(
        { userId: data1 },
        { $push: { products: [data2] } })
        .then((result) => {
            console.log("producto agregado al carrito")
            console.log(result)
            data3.redirect("/user/home")
        })
        .catch((err) => {
            console.log("error:")
            console.log(err)
            data3.send(err)
        })
}

function deleteCart(data1) {
    CartDB.findOneAndDelete({ userId: data1 })
        .then((result) => {
            console.log("Carrito borrado")
            console.log(result)
        })
        .catch((err) => {
            console.log("error:")
            console.log(err)
        })

}
// async function toCart(data1, data2, data3) {
//     await CartDB.updateOne(
//         { userId: data1 },
//         { $push: { products: [data2] } },
//         function (err, result) {
//             if (err) {
//                 console.log(err)
//                 logger.error(err)
//                 data3.send(err)
//             } else {
//                 console.log("producto agregado al carrito")
//                 console.log(result)
//                 data3.redirect("/user/home")
//             }
//         }
//     )
// }

export {
    findCart,
    cartProducts,
    createCart,
    saveCart,
    toCart,
    deleteCart
}