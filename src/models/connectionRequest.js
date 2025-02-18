const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "User",   //reference to the user collection
          required : true
    },
    toUserId : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "User",
          required : true
    },
    status : {
          type : String,
          required : true,
          enum : {
              values : ["ignored", "interested","rejected","accepted"],
              message : `{VALUE} is incorrect status type`
          }
    }
},{
    timestamps : true
})

connectionRequestSchema.pre("save", function (next){   //this function is like a middleware and will be called before the 
                                                      //save method is called
    const connectionRequest = this;
    //check if fromUserId is same as toUserId
    if(connectionRequest.toUserId.equals(connectionRequest.fromUserId)){
        throw new Error("Cannot send connection request to yourself");
    }
    next();
})

connectionRequestSchema.index({fromUserId : 1, toUserId : 1});

//model name always starts with capital letter
const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest", connectionRequestSchema
);

module.exports = ConnectionRequestModel;