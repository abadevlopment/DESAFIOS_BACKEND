import {
    registerUser,
    findUserInfo,
    findUserId,
    createFindCart,
    userProducts,
    allProducts,
    findAProduct,
    addToCart,
    buyoutCart
} from "../service/index.js";

// CONTROLLERS

function postRegisterUser(req, res) {
    registerUser(req.body, res)
}

async function getCreateFindCart(req, res) {
    if (req.user) {
        createFindCart(req.user._id)
        const userInfo = await findUserInfo(req.user._id)
        const cartProducts = (await userProducts(userInfo._id)).products
        const products = await allProducts()
        // console.log("controller products:");
        // console.log(products);
        // console.log("controller userInfo:");
        // console.log(userInfo);
        // console.log("controller cartProducts:");
        // console.log(cartProducts);

        res.render("home", {
            Name: userInfo.name,
            Products: products,
            ProductsQty: products.length,
            CartProducts: cartProducts,
            CartProductsQty: cartProducts.length
        })

    } else {
        res.redirect("/")
    }
}

async function getAllProducts(req, res) {
    const products = await allProducts()
    if (req.user) {
        res.redirect("/user/home")
    } else {
        res.render("index", {
            Products: products,
            ProductsQty: products.length
        })
    }
}

async function postAddToCart(req, res) {
    await addToCart(req.user._id, Number(req.params.id), res)
}

async function getUserCart(req, res) {
    if (req.user) {
        const userInfo = await findUserInfo(req.user._id)
        const cartProducts = (await userProducts(userInfo._id)).products
        res.render("cart", {
            Products: cartProducts,
            ProductsQty: cartProducts.length
        })
    } else {
        res.redirect("/")
    }
}

async function postBuyoutCart(req, res) {
    const userInfo = await findUserInfo(req.user._id)
    const userId = userInfo._id

    await buyoutCart(userId)
        .then(() => {
            console.log("Carrito registrado")
            res.render("buyout")
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })

}

export {
    postRegisterUser,
    getCreateFindCart,
    getAllProducts,
    postAddToCart,
    getUserCart,
    postBuyoutCart

}