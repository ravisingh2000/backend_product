const jwt = require("jsonwebtoken")
const User = require("../models/user");

confirmEmail = async (req, res, next) => {
    console.log("Email Confirmed")
    console.log(req.params.name)
    try {
        verifyuser = await jwt.verify(req.params.name, process.env.SECRET_KEY)
        let = await User.updateOne({ email: verifyuser.data }, {
            $set: {
                "Active": true
            }
        }
        )
        res.status(200).send(`<div style="text-align:center"><h1>Your Account is sucessfully confirmed</h1>
        <button class="btn btn-primary fs-5 mt-2 "><a href="https://newresumebuilder.herokuapp.com/login">Login Now</a></button></div> `)

    }
    catch (e) {
        res.status(404).send(`<h1 style="text-align:center">Sorry linkexpired!</h1>`)
    }
}


module.exports = confirmEmail
