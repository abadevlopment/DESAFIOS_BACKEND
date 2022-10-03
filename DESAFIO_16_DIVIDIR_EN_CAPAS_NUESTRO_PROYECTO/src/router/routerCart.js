import express from "express"

const routerCart = express.Router()

// routerCart.get("/", async (req, res) => {
//     logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
//     if (req.user) {
//         const userId = req.user._id.valueOf()
//         const userCart = await CartDB.findOne({ userId: userId }).lean()
//         const cartProducts = userCart.products
//         res.render("cart", {
//             Products: cartProducts,
//             ProductsQty: cartProducts.length
//         })
//     } else {
//         res.redirect("/")
//     }
// })

// routerCart.post("/addToCart/:id", (req, res) => {
//     logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
//     const userId = req.user._id.valueOf()
//     const getProduct = datosFaker.find(res => res.id == Number(req.params.id))

//     CartDB.updateOne(
//         { userId: userId },
//         { $push: { products: [getProduct] } },
//         function (err, result) {
//             if (err) {
//                 logger.error(err)
//                 res.send(err);
//             } else {
//                 logger.info("producto agregado al carrito");
//                 logger.info(result)
//                 // console.log("producto agregado al carrito");
//                 res.redirect("/home");
//             }
//         }
//     )
// })

// routerCart.post("/buyOut", async (req, res) => {
//     logger.info(`Petición recibida: ruta: '${req.url}', método: ${req.method}`)
//     const userId = req.user._id.valueOf()
//     const userPhone = req.user.phone

//     const userCart = await CartDB.findOne({ userId: userId }).lean()
//     const cartProducts = userCart.products

//     CartDB.findOneAndDelete(
//         { userId: userId },
//         function (err, result) {
//             if (err) {
//                 logger.error(err)
//                 res.send(err);
//             } else {
//                 userMessage(userPhone)
//                 userMessageWsp(req.user, cartProducts)
//                 emailServerCart(req.user, cartProducts)
//                 logger.info("carrito registrado");
//                 logger.info(result)
//                 // console.log("carrito registrado");
//                 // res.redirect("/home");
//                 res.render("buyout")
//             }
//         }
//     )
// })

export { routerCart }






