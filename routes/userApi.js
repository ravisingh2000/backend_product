const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userController = require("../controllers/userCont");
const confirmEmail = require("../services/auth.Service");
const sendEmail = require("../services/email.Service");
const authController = require("../controllers/authCont")

//routes 
const registerUser = [sendEmail.transporter, sendEmail.emailtoken, userController.register];
router.post("/register", registerUser);
router.post("/login", userController.login);
router.get("/profile", authController.tokenVerify, userController.profile)
router.post("/update", userController.update);

//routes for authentication
router.post("/changepassword", authController.tokenVerify, authController.changepassword)
router.get("/confirmEmail/:name", confirmEmail);
router.post("/forgotpassword", authController.forgotpassword)
router.post("/validEmailUser", authController.validEmailUser)
router.post("/getoken", async (req, res) => {
    verify = await jwt.verify(req.body.data, process.env.SECRET_KEY);
    console.log(verify)
    try {
        res.status(200).json({ valid: true, email: verify.data })
    }
    catch (e) {

        res.json({ valid: false })
    }
}
)
router.get("/confirmationpage", authController.tokenVerify, async (req, res) => {
    try {
        console.log(req.token)
        const data = await User.findOne({ email: req.token })
        console.log(data)
        res.status(200).json({ data: data.email })
    }
    catch {

    }
})
router.post("/forgotEmailConfirm", sendEmail.transporter, sendEmail.emailtoken, async (req, res) => {
    console.log('dddd')
    console.log(req.body)
    const token = jwt.sign({
        email: req.body.data.email,
    }, process.env.SECRET_KEY)
    res.status(200).json({
        token: token
    })
})
router.post("/emailStatus", async (req, res, next) => {
    console.log(req.body.result)
    const data = await User.findOne({ email: req.body.result });
    res.status(200).json({
        data: data

    })


})

module.exports = router;