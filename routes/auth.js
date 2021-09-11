const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const students = require('../models/student');
const templates = require("..//models/template")
router.get("/valid", async (req, res) => {
        try {
                const token = req.cookies.mainproject;
                await jwt.verify(token, process.env.SECRET_KEY);
                res.status(200).json({
                        value: true
                })
        }
        catch (e) {

                res.status(200).json({
                        value: false
                })
        }
})
router.post("/validEmailUser", async (req, res) => {
        console.log(req.body.Email)

        const valid = await students.findOne({ email: req.body.Email });
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

)

module.exports = router;