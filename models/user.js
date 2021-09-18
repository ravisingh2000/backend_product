const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const UserData = new mongoose.Schema({
        "FirstName": String,
        "LastName": String,
        "email": String,
        "Password": String,
        "College": String,
        "Active": { type: Boolean, default: false }
}, { timestamps: true });

//automatically expiring after 10 day if user not confirm email
UserData.index({ createdAt: 1 }, { expireAfterSeconds: 864000, partialFilterExpression: { Active: false } });

//middlewares
UserData.pre("save", async function (next) {
        try {
                const salt = await bcrypt.genSalt(10);
                this.Password = await bcrypt.hash(this.Password,salt )
        }
        catch (error) {
                console.log(error)
        }
        next();
})
// UserData.pre("findOneAndUpdate", async function (next) {
//         try {
//                 console.log(this.getUpdate())
//                 const data = this.getUpdate().$set.Password = await bcrypt.hash(this.getUpdate().$set.Password, 10);
//         }
//         catch (error) {

//         }
//         next();
// })

const User = new mongoose.model("User", UserData);
module.exports = User;