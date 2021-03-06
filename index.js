const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var emailRegex = require('regex-email');

//EXPRESSJS SETUP
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//NODEMAILER TRANSPORTER OBJECT SETUP
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'evaninemailorja@gmail.com',
        pass: 'abeAG123'
    }
});

//NEW DIRECT CONTACT
app.post('/direct-contact', function (req, res) {
    if (emailRegex.test(req.body.email)) { //test email regex
        var mailOptions = {
            from: 'miller',
            to: 'evanmillersolutions@gmail.com',
            subject: 'New Direct Contact',
            text: buildContactEmail(req.body)
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Thank you! Your message has been sent and we will be in touch with you shortly.');
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('There seems to be a problem with the email you typed. Please try again.');
    }
});

function buildContactEmail(data) {
    email = "";
    email += "Sender name: " + data.name;
    email += "\nEmail: " + data.email;
    email += "\nDetails: " + data.details;
    return email;
}


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${ PORT }`));


