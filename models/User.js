const mongoose = require("mongoose")
const validator = require('validator')
//schema
const userSchema = new mongoose.Schema({
    country:{
        type:String,
        require: [true,'Must select a Country']
    },
    fname: {
        type: String,
        minlength:[2,'First Name must have 2 or more characters'],
        required: [true, 'Please Enter a First Name']
    },
    lname:{
        type:String,
        minlength:[2,'Last Name must have 2 or more characters'],
        required: [true, 'Please Enter a Last Name']
    },
    email:{
        type:String,lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw  new Error("Email is not valid")
            }
        }
    },
    password: {
        type: String,
        minlength: [8,'Password must have 8 Characters or more']
    },
    passwordrepeat: {
        type:String,
        validate(value){
            if(!validator.equals(value,this.password)){
                throw new Error('ERROR Passwords do not match')
            }
        }
    },
    address: {
        type:String,
        required:[true,'Please Enter your Address']
    },
    addressline2:String,
    city: {
        type:String,
        required: [true,'Please enter your city']
    },
    state: {
        type:String,
        required: [true,'Please enter your State']
    },
    zip:Number,
    pnumber:Number
})
module.exports= mongoose.model("User",userSchema);