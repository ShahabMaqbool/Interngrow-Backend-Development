const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const sendEmail = async (to, subject, text) => {

    await transporter.sendMail({
        from: '"Authentication API" <noreply@authapi.com>',
        to,
        subject,
        text,
    });

};

module.exports = sendEmail;