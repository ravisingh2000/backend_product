const express = require('express');
const router = express.Router();
const verifytoken=require("../controllers/authCont")
const resumeController = require("../controllers/resumeCont");

router.get("/getResumeData",verifytoken.tokenVerify,resumeController.resumeData)
router.post("/resume",verifytoken.tokenVerify,resumeController.saveResume)
module.exports = router;