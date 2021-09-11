const jwt = require("jsonwebtoken")
const students = require("../models/student");

confirmEmail = async (req, res, next) => {

    console.log(req.body)
    console.log(req.params.name)
    try {
        verifyuser = await jwt.verify(req.params.name, "ravisingh")
        let = await students.updateOne({ email: verifyuser.data }, {
            $set: {
                "Active": true
            }
        }
        )
        res.status(200).redirect("http://localhost:4200/login")
    }
    catch (e) {
        res.status(404).send("linkexpired!")
    }}


module.exports = confirmEmail
