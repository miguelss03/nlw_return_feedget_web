import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

///envio de emails com mailtrap
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "be3e0fda8e003d",
        pass: "5ec32b5eddea4c"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe FeedGet <oi@feedget.com>',
            to: 'Miguel Silva <miguelvgd@gmail.com>',
            subject,
            html: body,
        });
    }
}