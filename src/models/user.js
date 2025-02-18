//user schema will define what fields will user have
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
   firstName : {
      type : String,
      required : true
   },
   lastName : {
      type : String
   },
   emailId : {
      type : String,
      required : true,
      unique : true,
      trim : true,
      lowercase : true,
      validate(value){
         if(!validator.isEmail(value)){
            throw new Error("Invalid email address :" + value);
         }
      }
   },
   password : {
      type : String,
      required : true
   },
   age : {
      type : Number,
      min : 18 //minimum length should be 18
   },
   gender : {
      type : String,
      //custom validation function
      validate(value){
         if(!["male","female","others"].includes(value)){
            throw new Error("gender is not valid");
         }
      }
   },
   photoUrl : {
      type : String,
      // validate(value){
      //    if(!validator.isURL(value)){
      //       throw new Error("Invalid email address :" + value);
      //    }
      // }
   },
   about : {
      type : String
   },
   skills : {
      type : [String]   //array of strings
   }
},{
   timestamps : true
})


//! these are the schema methods that is applicable for each user or every intance of User model
//! we can reuse these methods and + using these methods makes our api code much cleaner or easier to read
//! these methods are very much related to the user like creating jwt token for user and validating the password that's why we 
//! are creating these schema methods
userSchema.methods.getJWT = async function (){
   const user = this;
   const token = await jwt.sign({ _id : user._id }, "devTinder@388" ,{
         expiresIn: "1d",
   });

   return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
   user = this;
   const passwordHash = user.password;
   const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
   return isPasswordValid;
}


//create user model
const User = mongoose.model("User",userSchema);

module.exports = User;