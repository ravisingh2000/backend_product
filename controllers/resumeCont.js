const User = require("../models/user");
const verifytoken = require("../controllers/authCont")
const Resume = require("..//models/resume")

exports.resumeData = async (req, res, next) => {

        // console.log(req.body)
        try {
                const data = await Resume.findOne({ Gmail: req.token });
                console.log(data.Education[1])
                res.status(200).json({ data, token: true })
        }
        catch (e) {
                res.sendStatus(404)
        }
        next();
}
exports.saveResume = async (req, res, next) => {

        console.log(req.body.data)

        res.cookie("resumeToken", req.body.data.Email,
                { maxAge: 31536000000 }
        );
        const submit = {
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
                "Social": req.body.data.Social,
                "Gmail": req.token
        }
        const Exist = await Resume.findOne({ Gmail: req.token });

        if (Exist != null) {
                const data = await Resume.findOneAndUpdate({ Gmail: req.token }, submit, {
                        new: true, useFindAndModify: false
                })
                res.status(200).json({ data })
        }
        else {
                let resume = new Resume(submit);
                const data = await resume.save();
                res.status(200).json({ data })
        }

}