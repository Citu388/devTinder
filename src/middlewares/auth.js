const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req,res,next) => {
   try{
      const {token} = req.cookies;
      if(!token){
         return res.status(401).send("Please Login!")
      }
      const decodedObj = await jwt.verify(token,"devTinder@388");
      const {_id} = decodedObj;
      const user = await User.findById(_id);
      if(!user){
         throw new Error("User does not exist");
      }
      req.user = user;
      next();
   }catch(err){
      res.status(400).send("ERROR : " + err.message);
   }
}




// const adminAuth = (req,res,next) => {
//           const token = "abc";
//           const isAdminAuthorized = token === "abc";
//           if(!isAdminAuthorized){
//              res.status(401).send("Unauthorized request");
//           }
//           else{
//              next();
//           }
// }

// const userAuth = (req,res,next) => {
//           const token = "xyz";
//           const isAdminAuthorized = token === "xyz";
//           if(!isAdminAuthorized){
//              res.status(401).send("Unauthorized request");
//           }
//           else{
//              next();
//           }
// }

module.exports = {
  userAuth,
};