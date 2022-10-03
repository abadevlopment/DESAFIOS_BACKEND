import {
    // USER
    saveUser, userInfo, userId,
    // CART
    findCart, cartProducts, createCart, saveCart
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

export {
    // USER
    registerUser, findUserInfo, findUserId,
    // CART
    createFindCart, userProducts
}