import express from "express"
import { postAddToCart, getUserCart, postBuyoutCart } from "../controller/index.js"


const routerCart = express.Router()

routerCart.get("/", getUserCart)

routerCart.post("/addToCart/:id", postAddToCart)

routerCart.post("/buyOut", postBuyoutCart)

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






