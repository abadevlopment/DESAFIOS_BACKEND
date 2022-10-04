import mongoose from "mongoose";
import { UserDB } from "../model/index.js"
import { URI } from "../config/index.js"
import bcrypt from "bcrypt"

mongoose
    .connect(URI)
    .then(() => console.log("DB User conectada"))
    // .then(() => { })
    .catch((err) => console.log(err))
// .catch((err) => logger.error(err))

async function saveUser(data1, data2) {
    const { username, password, name, adress, age } = data1
    const fullPhone = data1.full_phone[0]
    UserDB.findOne({ username }, async (err, user) => {
        if (err) console.log(err)
        if (user) data2.render("reg-error")
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new UserDB({
                username,
                password: hashedPassword,
                name,
                adress,
                age,
                phone: fullPhone
            })
            await newUser.save()
            data2.redirect("/user/login")
        }
    })
}

function userInfo(data) {
    const user = UserDB.findById(data).lean()
    return user
}
// async function userInfo(data) {
//     const user = await UserDB.findById(data).lean()
//     return user
// }

// function userId(data) {
//     const id = data.valueOf()
//     return id
// }
async function userId(data) {
    const id = data.valueOf()
    return id
}



export {
    saveUser,
    userInfo,
    userId,

}