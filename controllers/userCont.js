const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const User = require("../models/user");

exports.register = async (req, res, next) => {
    console.log(req.body)

    try {
        let data = await User.findOne({ email: req.body.data.email });
        // console.log(data)
        // console.log(req.url)

        if (data != null && data.Active == false) {
            console.log("allowed")
            const salt = await bcrypt.genSalt(10);
            req.body.data.password = await bcrypt.hash(req.body.data.password, salt)
            data = await User.findOneAndUpdate({ email: req.body.data.email }, {
                $set: {
                    "FirstName": req.body.data.firstname,
                    "LastName": req.body.data.lastname,
                    "Password": req.body.data.password
                }
            },
                {
                    new: true,
                }
            )
        }
        else {
            console.log("ghjmnbvfrtyuj")
            const saveUser = new User({
                "FirstName": req.body.data.firstname,
                "LastName": req.body.data.lastname,
                "email": req.body.data.email,
                "Password": req.body.data.password
            })
            data = await saveUser.save();

        }
        const token = jwt.sign({
            email: data.email,
        }, process.env.SECRET_KEY)
        console.log()
        res.status(200).json({
            valid: true
            , token: token
        })

    }
    catch (e) {
        res.status(401).json({
            valid: false
        })

    }

}

exports.profile = async (req, res) => {
    try {
        const data = await User.findOne({ email: req.token });
        res.status(200).json({
            valid: true,
            data: data
        })
    }
    catch (error) {
        res.status(200).json({
            valid: false
        })
    }

}
exports.login = async (req, res) => {
    try {
        console.log("data")
        const data = await User.findOne({ email: req.body.data.email });
        const bcryptpassword = await bcrypt.compare(req.body.data.password, data.Password);
        if (data.Active == true && bcryptpassword == true) {
            const token = jwt.sign({ email: req.body.data.email }, process.env.SECRET_KEY)
            res.cookie("mainproject", token,
                {
                    maxAge: 31536000000
                    , httpOnly: false,
                    secure: false,
                }
            );
            res.status(200).json({
                bcryptValid: true,
                data: data,
                token: token
            })
        }
        else {
            res.sendStatus(401)
    }
}
    catch (error) {
        res.sendStatus(401)

    }
}
exports.update = async (req, res, next) => {


    try {
        data = await User.findOneAndUpdate({ email: req.body.data.email }, {
            $set: {
                "FirstName": req.body.data.firstname,
                "LastName": req.body.data.lastname,
                "email": req.body.data.email,
                "College": req.body.data.college,

            }
        }, {
            new: true,
            useFindAndModify: false
        })
        res.status(200).json({
            bcryptValid: true,
            data: data
        })
    }
    catch (error) {
        res.json({
            bcryptValid: false
        })
    }

}