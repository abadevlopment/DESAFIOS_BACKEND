const nodemailer = require("nodemailer")
const { SERVER_MAIL, PASS_SERVER_MAIL } = require("../config")

const emailServer = async (user) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: SERVER_MAIL,
            pass: PASS_SERVER_MAIL
        }
    })

    const emailContent = {
        from: SERVER_MAIL,
        to: SERVER_MAIL,
        subject: "Notificaión de nuevo usuario registrado",
        html: `
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
                <td>PASSWORD:</td>
                <td>${user.password}</td>
            </tr>
            <tr>
                <td>NOMBRE:</td>
                <td>${user.name}</td>
            </tr>
            <tr>
                <td>DIRECCION:</td>
                <td>${user.adress}</td>
            </tr>
            <tr>
                <td>EDAD:</td>   
                <td>${user.age}</td>
            </tr>
            <tr>
                <td>TELEFONO:</td>
                <td>${user.phone}</td>
            </tr>
        </table>`
    }

    try {
        const info = await transporter.sendMail(emailContent);
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}

module.exports = emailServer
