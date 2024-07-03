const mongoose = require('mongoose')

//  Schema
const userScheme = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
   lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
    },
    jobTitle:{
        type:String,
        required:true,
    },
},{timestamps:true})
const User = mongoose.model('user', userScheme)


module.exports = User    