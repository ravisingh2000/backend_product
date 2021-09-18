
const mongoose = require('mongoose');
const template = new mongoose.Schema({
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
         "Social":Array,
         "Gmail":String
        

});

const Resume = new mongoose.model("template", template,"temp");
module.exports = Resume;