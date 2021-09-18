const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require('bcrypt')
//verification of authorize token
exports.tokenVerify = async (req, res, next) => {

    if (!req.headers.authorization) {

        return res.status(401).send("Unauthorized request");
    }
    else {
        const token = req.headers.authorization
        if (token == "null") {
            return res.status(401).send("Unauthorized request");
        } else {
            try {
                verify = await jwt.verify(token, process.env.SECRET_KEY);
                req.token = verify.email;
            }
            catch (error) {
                res.sendStatus(404)
            }
        }

    }
    next();
}
exports.changepassword = async (req, res) => {
    try {

        const token = req.token;
        console.log(token)
        let data = await User.findOne({ email: token })
        console.log(req.body)
        const bcryptpassword = await bcrypt.compare(req.body.currentpassword, data.Password);
        console.log(bcryptpassword)
        if (bcryptpassword == true) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
            data = await User.findOneAndUpdate({ email: verify.email }, {
                $set: {
                    "Password": req.body.password,
                }
            }, {
                new: true,
                useFindAndModify: false
            })
            console.log(data)
            res.status(200).json({
                valid: true,
                data: data
            })
        }
        else{
            res.sendStatus(401)
        }

    }

    catch (e) {
        res.sendStatus(401)



    }

}
exports.forgotpassword = async (req, res) => {
    console.log(req.body)
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)
    data = await User.findOneAndUpdate({ email: req.body.email }, {
        $set: {
            "Password": req.body.password,
        }
    }, {
        new: true,
        useFindAndModify: false
    })
    console.log(data)
    res.status(200).json({
        bcryptValid: true,
        data: data
    })
}
exports.validEmailUser = async (req, res) => {
    console.log(req.body.Email)

    const valid = await User.findOne({ email: req.body.Email });
    if (valid == null) {

        res.status(200).json({ value: false })
    }
    else {
        console.log(valid)
        if (valid.Active == false)
            res.status(200).json({ value: false })
        else
            res.status(200).json({ value: true })
    }
}
exports.google = async (req, res) => {


}