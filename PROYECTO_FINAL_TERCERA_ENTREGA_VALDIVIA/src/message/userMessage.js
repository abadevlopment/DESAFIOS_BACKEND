const twilio = require("twilio")
const { ADMIN_PHONE, ACCOUNT_SID, AUTH_TOKEN, TWILIO_PHONE } = require("../config")

const userMessage = (phone) => {
    const accountSid = ACCOUNT_SID;
    const authToken = AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    const mensaje = "Su pedido ha sido recibido y se encuentra en proceso"

    client.messages
        .create({
            body: mensaje,
            from: TWILIO_PHONE,
            to: phone
        })
        .then(message => console.log(message.sid))
        .done();
}

module.exports = userMessage