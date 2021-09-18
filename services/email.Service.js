const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
let transporter;
exports.transporter = async (req, res, next) => {
    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,

        auth: {
            user: process.env.Email,
            pass: process.env.KEY
        },
    });

    next();
}
exports.emailtoken = async (req, res, next) => {
    console.log("ghjkl")
    try {
        console.log(req.body.data)
        var expression = jwt.sign({ data: req.body.data.email }, process.env.SECRET_KEY, {

            expiresIn: "600s"

        });
    }
    catch (e) {
        console.log(e)
    }
    if (req.url == "/register") {
        var message = {
            from: process.env.Email,
            to: req.body.data.email,
            subject: "Message title",
            text: "Plaintext version of the message",
            html:
                `<!-- <p>confirmmail works!</p> -->
            
                <div class="container">
                    
                    
                    <div  style="height: 320px;border-radius: 5px;-webkit-border-radius: 5px;padding: 20px;background-color: #ffffff;box-shadow: 0 8px 42px 0 rgba(0, 0, 0, 0.08);">
                                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1>
                                <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120"  />
                                  <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>   
                                   <button class="btn btn-primary fs-5 mt-2 "><a href="https://newresumebuilder.herokuapp.com/api/confirmEmail/${expression}">Confirm account</a></button>
                                   <h3 style="text-align:center">Or</h3>
                                   <p > 
                                 
                                    use that if button not work
                                    <br>link: https://newresumebuilder.herokuapp.com/api/confirmEmail/${expression}
                                </p> 
                </div> </div> 
                `

        };
    }
    else {
        var message = {
            from: "ravisingh11808322@gmail.com",
            to: req.body.data.email,
            subject: "Message title",
            text: "Plaintext version of the message",
            html: `<h3>Welcome to resume builder</h3>
            <p><b>click link to reset password: </b>https://newresumebuilder.herokuapp.com/forgotpassword/${expression}</p>

            `
        }
    }
    transporter.sendMail(message);
    next();
}


