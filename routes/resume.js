const express = require('express');
const router = express.Router();
const templates = require("..//models/template")

router.get("/getTemplateData", async (req, res) => {
        console.log("jjjjjjjjjjjjjjj")
        console.log(req.body)
        try {
                console.log("hhhhhhhh")
                const token = req.cookies.resumeToken;

                if (token != undefined) {
                        const data = await templates.findOne({ Email: token });
                        console.log("hhhhhhhh")
                        res.status(200).json({ data, token: true })
                }
                else {
                        res.status(200).json({ token: false })
                }
        }
        catch (e) {
                res.sendStatus(404)
        }
})
router.post("/template", async (req, res, next) => {

        console.log(req.body.data.Education)
        res.cookie("resumeToken", req.body.data.Email,
                { maxAge: 31536000000 }
        );
        try {
                console.log(req.body.data.Name)
                const submit = new templates({
                        "Name": req.body.data.Name,
                        "Email": req.body.data.Email,
                        "Phone": req.body.data.Phone,
                        "Position": req.body.data.Position,
                        "Address": req.body.data.Address,
                        "Objective": req.body.data.Objective,
                        "skills": req.body.data.skills,
                        "Education": req.body.data.Education,
                        "Experience": req.body.data.Experience,
                        "Project": req.body.data.Project,
                        "Certificate": req.body.data.Certificate,
                        "Social": req.body.data.Social
                })
                const data = await submit.save();
                res.status(200).json({ data })
        }
        catch (e) {
                res.status(404).send("IncorectPassword!")

        }
}
)
module.exports = router;