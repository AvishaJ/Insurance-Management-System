var nodemailer = require('nodemailer');

function marketing(req,resp)
{
    let {to,subject,text} = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'k.s.venkat614@gmail.com',
            pass: 'gnequdefnunslsbl'
        }
    });
    
    var mailOptions = {
        from: 'k.s.venkat614@gmail.com',
        to: to,
        subject: subject,
        text: text,
        attachments: [{
            filename: "scheme"
        }]     
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            resp.status(403).send("fail to send mail");
        } else {
            console.log('Email sent: ' + info.response);
            resp.status(201).send("mail sent Successfully");
        }
    });
}

module.exports = {marketing};
