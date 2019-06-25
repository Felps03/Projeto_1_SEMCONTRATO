const nodemailer = require('nodemailer');
const generateString = require('./generateString');

class GenerateEmail {

    sendEmail(userEmail) {

        return new Promise((resolve, reject) => {

            //  email credentials
            const email = "projeto.sem.contrato@gmail.com";
            const passwd = "C0nnect123";

            // setting email sender service
            const sender = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: email, // email account
                    pass: passwd // email password
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            
            //url change password 
            const url = "https://semcontrato.netlify.com/recovery.html";

            // generating string to send via email
            const randomString = generateString();

            /*
             the function sendMail returns a promise if a callback function is not set. So we check the 
             promise with then/catch and
             use this to set our promise to the function's return
            */



            // sending email
            sender.sendMail({
                    from: `"Equipe Sem Contrato" <${email}>`, // sender address
                    to: `${userEmail}`, // list of receivers
                    subject: "Recuperação de senha!", // Subject line
                    text: `
                    Você solicitou a recuperação de senha, acesse o link abaixo e insira o código no campo solicitado.
                    
                    ${url}

                    Código: ${randomString}
                    
                    
                    Equipe Sem Contrato!
                    `,
                })
                .then(() => {
                    resolve(randomString);
                })
                .catch(e => {
                    // console.log('erro');
                    // console.error(e);
                    reject(e);
                });

        })
    }
}
module.exports = GenerateEmail;