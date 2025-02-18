const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async function(req,res) {

          try{
             const user = req.user;
             res.send(user);
          }catch(err){
             res.status(400).send("ERROR :" + err.message);
          }
          
})

profileRouter.patch("/profile/edit", userAuth, async function(req,res){
     try{
          if(!validateEditProfileData(req)){
             throw new Error("Invalid edit request!");
          }
          loggedInUser = req.user;
          Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
          await loggedInUser.save();
          // res.send(`${loggedInUser.firstName}, your profile updated successfully`);
          res.json({message : `${loggedInUser.firstName}, your profile updated successfully`,
                data : loggedInUser});
     }catch(err){
          res.status(400).send("ERROR : " + err.message);
     }   
})

//forgot password api
profileRouter.patch("/profile/password", async function(req,res) {
  
})

module.exports = profileRouter;