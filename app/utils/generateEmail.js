const sgMail = require('@sendgrid/mail');
// const nodemailer = require('nodemailer');
const generateString = require('./generateString');

class GenerateEmail {

    sendEmail(userEmail, randomString) {

        //url change password 
        // const url = "localhost:3000/user-recovery.html";
        const url = "https://http://semcontratoo.azurewebsites.net/user-recovery.html";

        // generating string to send via email
        // const randomString = generateString();
        console.log(randomString);


        sgMail.setApiKey('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');
        // sgMail.setApiKey('SG.OJRExlvvSeqgups0vtivHQ.wyvvEbiAkYds9fYjEZi8gr4UAT8MNhTV-QnZLsjk6Agaaaaaaaaa');

        const msg = {
            to: `${userEmail}`,
            from: 'projeto.sem.contrato@gmail.com',
            subject: 'Recuperação de senha!',
            text: `
                    Você solicitou a recuperação de senha, acesse o link abaixo e insira o código no campo solicitado.

                    ${url}?key=${randomString}

                    Código: ${randomString}
                    
                    Equipe Sem Contrato!
                    `,
            html: `
                    <p>Você solicitou a recuperação de senha, acesse o link abaixo e insira o código no campo solicitado.</p>

                    <a href='${url}?key=${randomString}'>Recuperar Senha</a> <br><br>

                    Código: ${randomString}<br><br>
                    
                    <strong>Equipe Sem Contrato!</strong>
                `
        };
        return sgMail.send(msg);
    }
}
module.exports = GenerateEmail;

// const a = new GenerateEmail();
// a.sendEmail('felipe.031293@gmail.com')