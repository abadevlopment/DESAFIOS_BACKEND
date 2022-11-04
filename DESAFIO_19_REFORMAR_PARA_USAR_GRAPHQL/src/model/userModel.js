import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    adress: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
})

const UserDB = mongoose.model("User", UserSchema)

export default UserDB