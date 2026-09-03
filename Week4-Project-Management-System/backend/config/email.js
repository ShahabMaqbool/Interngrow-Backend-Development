const nodemailer = require("nodemailer");

let transporter;

const setupEmail = async () => {
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    console.log("Test Email Account Created Successfully");
};

const sendEmail = async (to, subject, text) => {
    if (!transporter) {
        await setupEmail();
    }

    const info = await transporter.sendMail({
        from: '"Week 4 Project Management" <no-reply@example.com>',
        to,
        subject,
        text
    });

    console.log("Email Sent Successfully");
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    return info;
};

module.exports = {
    setupEmail,
    sendEmail
};