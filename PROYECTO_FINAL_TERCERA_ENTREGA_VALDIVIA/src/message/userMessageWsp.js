const twilio = require("twilio")
const { ADMIN_PHONE, ACCOUNT_SID, AUTH_TOKEN, TWILIO_PHONE, WSP_TWILIO_PHONE, WSP_ADMIN_PHONE } = require("../config")

const userMessageWsp = (user, prods) => {
    const accountSid = ACCOUNT_SID;
    const authToken = AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    const products = prods.map((res) =>
        `${res.id} - ${res.title} - ${res.price} \n`
    )

    const mensaje =
        `
        USUARIO:${user.username} \n
        NOMBRE:${user.name} \n
            ${products}
        `

    client.messages
        .create({
            body: mensaje,
            from: WSP_TWILIO_PHONE,
            to: WSP_ADMIN_PHONE
        })
        .then(message => console.log(message.sid))
        .done();
}

module.exports = userMessageWsp