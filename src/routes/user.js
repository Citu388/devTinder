const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
userRouter.get("/user/requests/received", userAuth, async function (req,res) {
   try{
      const loggedInUser = req.user;
      const connectionRequests = await ConnectionRequest.find({
          toUserId : loggedInUser._id,
          status : "interested"
      }).populate("fromUserId",["firstName","lastName","about","skills","photoUrl","age"]);

      res.json({
          message :"Data fetched successfully",
          data : connectionRequests,
      })
   }catch(err){
      res.status(400).send("ERROR :" + err.message);
   }
})

userRouter.get("/user/connections", userAuth, async function (req,res){
    try{
          const loggedInUser = req.user;
          const connectionRequests = await ConnectionRequest.find({
             $or : [
                 { toUserId : loggedInUser._id, status : "accepted" },
                 { fronUserId : loggedInUser._id, status : "accepted" }
             ],
          }).populate("fromUserId",["firstName","lastName","about","skills","photoUrl","age"])
          .populate("toUserId",["firstName","lastName","about","skills","photoUrl","age"])

          const data = connectionRequests.map((row) => {
             if(row.fromUserId._id.toString() === loggedInUser._id){
               return row.toUserId;
             }
             return row.fromUserId;
          });
          res.json({data});
    }catch(err){
          res.status(400).send("ERROR :" + err.message);
    }
})

userRouter.get("/feed", userAuth, async function(req,res) {
    try{
          const loggedInUser = req.user;

          const page = parseInt(req.query.page) || 1;
          let limit = parseInt(req.query.limit) || 10;
          limit = limit > 50 ? 50 : limit;

          const skip = (page-1)*limit;

          //find all the connection requests(sent + received)
          const connectionRequests = await ConnectionRequest.find({
              $or : [
                 {toUserId : loggedInUser._id},
                 {fromUserId : loggedInUser._id}
              ]
          }).select("toUserId fromUserId");


          const hideUsersFromFeed = new Set();
          connectionRequests.forEach((req) =>{
             hideUsersFromFeed.add(req.toUserId.toString());
             hideUsersFromFeed.add(req.fromUserId.toString());
          })

          const users = await User.find({
            $and: [
              { _id: { $nin: Array.from(hideUsersFromFeed) } },
              { _id: { $ne: loggedInUser._id } },
            ],
          }).select("firstName lastName about skills photoUrl age").skip(skip).limit(limit);

          res.json({ data: users });
    }catch(err){
          res.status(400).json({message : err.message});
    }
})

module.exports = userRouter;