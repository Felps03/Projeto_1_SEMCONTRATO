const nodemailer = require('nodemailer');
const generateString = require('./generateString');

async function sendEmail(userEmail) {

    const email = "projeto.sem.contrato@gmail.com";
    const passwd = "C0nnect123";

    // setting email sender service
    const sender = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: email, // email account
            pass: passwd // email password
        }
    });

    // generating string to send via email
    const randomString = generateString();

    // sending email
    let status = await sender.sendMail({
        from: `"Equipe Sem Contrato" <${email}>`, // sender address
        to: `${userEmail}`, // list of receivers
        subject: "Recuperação de senha!", // Subject line
        text: `
                Você solicitou a recuperação de senha, insira este código no campo solicitado.

                Código: ${randomString}


                Equipe Sem Contrato!
            `,
    });

}
sendEmail().catch(console.error);
module.exports = sendEmail;