const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeMail = (email, name) => {
    try {
        sgMail.send({
            to: email,
            from: 'kamlesh.cmpn@gmail.com',
            subject: 'Welcome in Task app.',
            text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
        })
    }
    catch(e) {
        console.log(e)
    }
    
}

const sendCancelMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kamlesh.cmpn@gmail.com',
        subject: 'Cancel mail',
        text: `Hi ${name}, Thanks for your valuable time in task app. Let us know how we can improve our service.`
    })
}

module.exports = {
    sendWelcomeMail,
    sendCancelMail
}