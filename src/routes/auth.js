const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

//!we are gonna create a post api to singup the user
authRouter.post("/signup", async function(req,res){


          try{
             const {password,firstName,lastName,emailId} = req.body;
             //validation of data
             validateSignUpData(req);
             //Encrypt the password
             
             const passwordHash = await bcrypt.hash(password,10);
             //Creating a new instance of the User model
             const user = new User({
                firstName,
                lastName,
                emailId,
                password : passwordHash,
                photoUrl : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
             });  //now this data we are getting from api
             const savedUser = await user.save();
             const token = await savedUser.getJWT();    
              res.cookie("token", token);
       
             
             res.json({message :"User added Successfully!" ,data : savedUser});
          }catch(err){
             res.status(400).send("Error saving the user :" + err.message);
          }
          
});



authRouter.post("/login", async function(req,res){
          try{
             const {emailId, password} = req.body;  //this emailId and password is what user has entered
       
             const user = await User.findOne({ emailId : emailId});
             if(!user){
               //  throw new Error("Email id does not exist");
               throw new Error("Invalid Credentials");
             }
             // const isPasswordValid = await bcrypt.compare(password,user.password);
             const isPasswordValid = await user.validatePassword(password);   //!using schema method that we created in user.js
       
             if(isPasswordValid){
                //!create a JWT token
                // const token = await jwt.sign({ _id : user._id }, "devTinder@388" ,{
                //    expiresIn: "1d",
                // });                    //we are hiding the user id inside the token
                const token = await user.getJWT();     //!this another way to to write the code to create jwt token
                
       
                //! add the token to cookie and send the response back to the user
                res.cookie("token", token);
                res.send(user);
             }
             else{
               //  throw new Error("Password is not correct");
               throw new Error("Invalid Credentials");

             }
          }catch(err){
             res.status(400).send("ERROR : " + err.message);
          }
})

authRouter.post("/logout", async function(req,res){
   res.cookie("token",null,{ expires : new Date(Date.now())});   //removing the cookie from user system
   //setting the token null and expires the cookie right away
   res.send("Logged out");
})


module.exports = authRouter;