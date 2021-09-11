const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const students = require("../models/student");
const userController = require("../controllers/userCont");
const confirmEmail = require("../services/auth.Service");
const sendEmail = require("../services/email.Service");

//routes
const registerUser = [sendEmail.transporter, sendEmail.emailtoken, userController.register];
router.post("/register", registerUser);
router.post("/profile", userController.profile);
router.post("/update", userController.update);
router.get("/confirmEmail/:name", confirmEmail);

router.get("/getdata", async (req, res) => {
        try {
                const token = req.cookies.mainproject;
                const verify = await jwt.verify(token, process.env.SECRET_KEY);
                const data = await students.findOne({ email: verify.email });
                res.status(200).json({
                        valid: true,
                        data: data
                })
        }
        catch (e) {
                res.status(200).json({
                        valid: false
                })
        }
})
router.post("/emailStatus", async (req, res, next) => {

        console.log(req.body)
        const data = await students.findOne({ email: req.body.result });
        res.json({
                data: data
        })


})

module.exports = router;