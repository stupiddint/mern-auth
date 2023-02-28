import nodemailer from 'nodemailer'
import mailgen from 'mailgen'
import env from '../config.js'

// https://ethereal.email/create
let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: env.EMAIL, // generated ethereal user
        pass: env.PASSWORD, // generated ethereal password
    }
}
let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new mailgen({
    theme: "default",
    product : {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    // body of the email
    var email = {
        body : {
            name: username,
            intro : text || `Welcome to Daily Tuition! We're very excited to have you on board.`,
            outro: `Need help, or have questions? Just reply to this email, we'd love to help.`
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from : env.EMAIL,
        to: userEmail,
        subject : subject || "Signup Successful",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us."})
        })
        .catch(error => res.status(500).send({ error }))

}