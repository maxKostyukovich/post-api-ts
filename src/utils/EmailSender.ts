import nodemailer from 'nodemailer'

class EmailSender {
    private _transporter: any;
    private readonly email: string;
    constructor(user: string, pass: string) {
        this.email = user;
        this._transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user,
                pass
            }
        })
    }

    public async sendEmail (to: string, subject: string, content: string){
        const options = {
            from: this.email,
            to,
            subject,
            text: content
        };
        const response = await this._transporter.sendMail(options);
        console.log(response);
    }
}
export default EmailSender