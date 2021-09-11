const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const students = require("../models/student");
let transporter;
exports.transporter = async (req, res, next) => {
    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: "ravisingh11808322@gmail.com",
            pass: "xqxfavfycqwtgeno"
        },
    }); 

    next()
}
exports.emailtoken = async (req, res, next) => {
    
    try {
        console.log(req.body.data.email)
        var expression = jwt.sign({ data: req.body.data.email }, "ravisingh", {

            expiresIn: "600s"

        });
    }
    catch (e) {
        console.log(e)
    }

    var message = {
        from: "ravisingh11808322@gmail.com",
        to: "ravitanwar95180@gmail.com",
        subject: "Message title",
        text: "Plaintext version of the message",
        html: `<!-- <p>confirmmail works!</p> -->
            <div style="background: #f5f5f5;padding-bottom:100px;padding-top:100px">
                <div class="container">
                    
                    
                    <div class="m-t-30 card-box" style="height: 320px;border-radius: 5px;-webkit-border-radius: 5px;padding: 20px;background-color: #ffffff;box-shadow: 0 8px 42px 0 rgba(0, 0, 0, 0.08);">
                        <div class="text-center">
                                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> 
                                <!-- <h4 class="text-uppercase font-bold m-b-0">Success !!</h4> -->
                            </div>
                            <div class="panel-body text-center">
                                <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120"  />
                                <!-- <img  src="data:image/png;base64,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" width="100" height="100"> -->
                                <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                                   <!-- <button></button> -->
                                   <button class="btn btn-primary fs-5 mt-2 "><a href="https://newresumebuilder.herokuapp.com/api/confirmEmail/${expression}">Submit</a></button>
                    
                                   <!-- <p class="mt-5" style="color: #9a9da0"> 
                                    A email has been send to <b>youremail@domain.com</b>. Please check for an email from company and click on the included link to reset your password.  
                                </p> -->
                            </div>
                        </div>
                    </div>
                </div>
            <!-- </div> -->`
    };
    transporter.sendMail(message);
    next();
}

    
