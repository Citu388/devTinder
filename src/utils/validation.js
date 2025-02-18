const validator = require("validator");

const validateSignUpData = (req) => {
   const { firstName, lastName, emailId, password } = req.body;
   if(!firstName || !lastName){
      throw new Error("Please enter you name");
   }
   else if(!validator.isEmail(emailId)){
      throw new Error("Please enter valid emailId");
   }
   else if(!validator.isStrongPassword(password)){
      throw new Error("Please enter strong password");
   }
}


const validateEditProfileData = (req) => {
   const allowedEditFields = ["firstName","lastName","photoUrl","gender","age","about","skills"];

   const isEditAllowed = Object.keys(req.body).every((field)=> allowedEditFields.includes(field));
   return isEditAllowed;
}

module.exports = {
   validateSignUpData,
   validateEditProfileData
}