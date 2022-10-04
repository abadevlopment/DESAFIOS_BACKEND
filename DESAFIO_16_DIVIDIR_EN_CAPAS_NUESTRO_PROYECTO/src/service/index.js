import {
    // USER
    saveUser, userInfo, userId,
    // CART
    findCart, cartProducts, createCart, saveCart, toCart, deleteCart,
    // PRODUCT
    getAllProducts, findProduct
} from "../dao/index.js"


// SERVICES
// USER
function registerUser(data1, data2) {
    saveUser(data1, data2)
}

async function findUserInfo(data) {
    const userData = await userInfo(data)
    return userData
}

function findUserId(data) {
    userId(data)
}

// CART
async function createFindCart(data) {
    const setUserInfo = await userInfo(data)
    // console.log(setUserInfo);
    const setUserId = await userId(data)
    // console.log("service setUserId:");
    // console.log(setUserId);
    const setFindCart = await findCart(setUserId)
    // console.log("service setFindCart:");
    // console.log(setFindCart);
    if (setFindCart.length == 0) {
        const newCart = await createCart(setUserId)
        await saveCart(newCart)
    }
}

function userProducts(data) {
    const userProducts = cartProducts(data)
    return userProducts
}

async function addToCart(data1, data2, data3) {
    const setUserId = await userId(data1)
    const prodToAdd = await findProduct(data2)
    await toCart(setUserId, prodToAdd, data3)
}

async function buyoutCart(data) {
    await deleteCart(data)
}


// PRODUCT
async function allProducts() {
    const products = await getAllProducts()
    // console.log("service products:");
    // console.log(products);
    return products
}

async function findAProduct(data) {
    const product = await findProduct(data)
    return product
}

export {
    // USER
    registerUser, findUserInfo, findUserId,
    // CART
    createFindCart, userProducts, addToCart, buyoutCart,
    // PRODUCT
    allProducts, findAProduct
}