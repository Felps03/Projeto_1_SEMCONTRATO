
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
    to: 'moleiro@ymail.com',
    from: 'projeto.sem.contrato@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
console.log(msg);
sgMail.send(msg);