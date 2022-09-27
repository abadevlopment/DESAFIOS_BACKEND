const express = require('express')
const { Router } = express
const passport = require("passport")
const mongoose = require("mongoose")
const UserDB = require("../models/user.js")
const CartDB = require("../models/carts.js")
// const bcrypt = require("bcrypt")
const { URI } = require('../config')
// FAKER ----------------------
const datosFaker = require("../mocks/index")
// LOGS
const logger = require('../logs/logger.js')

const emailServerCart = require("../mail/mailCart.js")
const userMessage = require("../message/userMessage.js")
const userMessageWsp = require("../message/userMessageWsp.js")

// MONGOOSE

mongoose
    .connect(URI)
    // .then(() => console.log("DB conectada"))
    .then(() => { })
    .catch((err) => logger.error(err))
// .catch((err) => console.log(err))

const routerCart = Router()

// RUTAS

routerCart.get("/", async (req, res) => {
    logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    if (req.user) {
        const userId = req.user._id.valueOf()
        const userCart = await CartDB.findOne({ userId: userId }).lean()
        const cartProducts = userCart.products
        res.render("cart", {
            Products: cartProducts,
            ProductsQty: cartProducts.length
        })
    } else {
        res.redirect("/")
    }
})

routerCart.post("/addToCart/:id", (req, res) => {
    logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    const userId = req.user._id.valueOf()
    const getProduct = datosFaker.find(res => res.id == Number(req.params.id))

    CartDB.updateOne(
        { userId: userId },
        { $push: { products: [getProduct] } },
        function (err, result) {
            if (err) {
                logger.error(err)
                res.send(err);
            } else {
                logger.info("producto agregado al carrito");
                logger.info(result)
                // console.log("producto agregado al carrito");
                res.redirect("/home");
            }
        }
    )
})

routerCart.post("/buyOut", async (req, res) => {
    logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
    const userId = req.user._id.valueOf()
    const userPhone = req.user.phone

    const userCart = await CartDB.findOne({ userId: userId }).lean()
    const cartProducts = userCart.products

    CartDB.findOneAndDelete(
        { userId: userId },
        function (err, result) {
            if (err) {
                logger.error(err)
                res.send(err);
            } else {
                userMessage(userPhone)
                userMessageWsp(req.user, cartProducts)
                emailServerCart(req.user, cartProducts)
                logger.info("carrito registrado");
                logger.info(result)
                // console.log("carrito registrado");
                // res.redirect("/home");
                res.render("buyout")
            }
        }
    )

})

module.exports = routerCart