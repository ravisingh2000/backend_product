const { json } = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const templates = new mongoose.Schema({
        "Name": String,
        "Email": String,
        "Objective": String,
        "Phone":String,
        "Position":String,
         "Address":String,
         "skills":Array,
         "Education":Array,
         "Experience":Array,
         "Project":Array,
         "Certificate":Array,
         "Social":Array
        

});
// students.pre("save", async function (next) {
//         try{
//         this.Password = await bcrypt.hash(this.Password, 10)
//         }
//         catch(error){
//                 console.log(error)
//         }
//         next();
// })
templates.pre("findOneAndUpdate", async function (next) {
        try{
        const data = this.getUpdate().$set.Password = await bcrypt.hash(this.getUpdate().$set.Password, 10);
        }
        catch(error){

        }
        next();
})
const student = new mongoose.model("template", templates,"temp");
module.exports = student;