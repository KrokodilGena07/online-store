const nodemailer = require('nodemailer');

class MailModel {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }

    async sendMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Activation account on online-store",
            html: `
                <div>
                    <h1>Activation account on online-store</h1>
                    <a href="${link}">Follow the link to activate</a>
                </div>
            `,
        });
    }
}

module.exports = new MailModel();