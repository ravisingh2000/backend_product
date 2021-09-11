const mongoose = require('mongoose')
console.log(process.env.DB)
mongoose.connect(process.env.DB, {
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log("sucessfull")
}).catch((error) => {
    console.log("unsucessfull")
})