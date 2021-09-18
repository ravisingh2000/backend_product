require('dotenv').config()
const express = require("express");
const cors = require('cors')
const path = require('path')
var compression = require("compression");
const cookieParser = require("cookie-parser")
require("./services/dbConect")
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(compression());
app.use(express.urlencoded({ extended: false }));
// const students = require("./models/student");
const userRouter = require("./routes/userApi")
const resumeRouter = require("./routes/resume")
app.use("/api", userRouter)
app.use("/api", resumeRouter)
// var corsOption={
//         origin:"http://localhost:4200"
// }
// app.use(cors(corsOption))

app.use(express.static(__dirname + '/meanstack'));
app.get("/api/signout", async (req, res) => {
        res.clearCookie("mainproject");
        res.clearCookie("resumeToken")
        res.status(200).json({
                valid: false
        })

})

app.get('*', function (req, res) {

        res.sendFile(path.join(__dirname + '/meanstack/index.html'));

});
app.listen(process.env.PORT || 3000, () => {
        console.log("Server start at: " + "http://localhost:" + 3000 + "/")

})