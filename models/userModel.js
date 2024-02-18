const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {type:String, require:true},
    email: {type:String, require:false},
    password: {type:String, require:true},
    mobileNo: {type:String, require:false},
})

const UserModel = mongoose.model("userData", userSchema)

module.exports = UserModel;