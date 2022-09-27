const nodemailer = require("nodemailer")
const { SERVER_MAIL, PASS_SERVER_MAIL } = require("../config")

const emailServerCart = async (user, prods) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: SERVER_MAIL,
            pass: PASS_SERVER_MAIL
        }
    })

    const products = prods.map((res) =>
        `<tr>
            <td>${res.id}</td>
            <td>${res.title}</td>
            <td>${res.price}</td>
        </tr>`
    )

    const emailContent = {
        from: SERVER_MAIL,
        to: SERVER_MAIL,
        subject: `Nuevo pedido de: ${user.name}`,
        html:
            `
        <table>
            <tr>
                <th></th>
                <th>INFO</th>
            </tr>
            <tr>
                <td>USUARIO:</td>
                <td>${user.username}</td>
            </tr>
            <tr>
                <td>NOMBRE:</td>
                <td>${user.name}</td>
            </tr>
            <tr>
                <th>ID:</th>
                <th>PRODUCTO:</th>
                <th>PRECIO:</th>
            </tr>
            ${products}
        </table>
        `
    }

    try {
        const info = await transporter.sendMail(emailContent);
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}

module.exports = emailServerCart
