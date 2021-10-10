var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uName : {type:String, required:true},
    uAddress : {type:String, required:true},
    uEmail : {type:String, required:true, unique:true},
    uPassword : {type:String, required:true},
    uNumber : {type:Number, required:true, unique:true},
    uOTP : {type:Number},
    isAdmin:{type:Boolean, default:false}
},{timestamps: true});

module.exports = mongoose.model("user", userSchema);