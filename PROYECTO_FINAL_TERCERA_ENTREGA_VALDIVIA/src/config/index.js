require("dotenv").config()
const URI = process.env.URI

const CLUSTER = process.env.MODE_CLUSTER

// NODEMAILER
const SERVER_MAIL = process.env.SERVER_MAIL
const PASS_SERVER_MAIL = process.env.PASS_SERVER_MAIL
const ADMIN_MAIL = process.env.ADMIN_MAIL

// TWILIO
const ADMIN_PHONE = process.env.ADMIN_PHONE
const WSP_ADMIN_PHONE = process.env.WSP_ADMIN_PHONE
const ACCOUNT_SID = process.env.ACCOUNT_SID
const AUTH_TOKEN = process.env.AUTH_TOKEN
const TWILIO_PHONE = process.env.TWILIO_PHONE
const WSP_TWILIO_PHONE = process.env.WSP_TWILIO_PHONE

module.exports = {
    URI,
    CLUSTER,
    SERVER_MAIL,
    PASS_SERVER_MAIL,
    ADMIN_MAIL,
    ADMIN_PHONE,
    ACCOUNT_SID,
    AUTH_TOKEN,
    TWILIO_PHONE,
    WSP_TWILIO_PHONE,
    WSP_ADMIN_PHONE
}