import { registerUser, findUserInfo, createFindCart, userProducts } from "../service/index.js";

// CONTROLLERS

function postRegisterUser(req, res) {
    registerUser(req.body, res)
}

async function getCreateFindCart(req, res) {
    if (req.user) {
        createFindCart(req.user._id)
        const userInfo = await findUserInfo(req.user._id)
        const cartProducts = (await userProducts(userInfo._id)).products
        // console.log("controller userInfo:");
        // console.log(userInfo);
        // console.log("controller cartProducts:");
        // console.log(cartProducts);

        res.render("home", {
            Name: userInfo.name,
            // Products: datosFaker,
            // ProductsQty: datosFaker.length,
            CartProducts: cartProducts,
            CartProductsQty: cartProducts.length
        })

    } else {
        res.redirect("/")
    }
}

export {
    postRegisterUser,
    getCreateFindCart,

}