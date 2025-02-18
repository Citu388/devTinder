const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
   origin : "http://localhost:5173",
   credentials : true,
   // optionSuccessStatus:200
}));
app.use(express.json()); //express.json() is a middleware given by express to convert json data to js object
//this func will be called for every route or request becoz we have not specified any route.
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use('/', authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
// app.post("/sendConnectionRequest", userAuth, async function(req,res){
//    const user = req.user;
//    res.send(user.firstName + " sent the connection request");
// })

//we will first connect to DB then listen to incoming requests


connectDB().then(() => {
   console.log("database connection established");
   app.listen(3000, () => {
      console.log("server is listening on port 3000");
   });
}).catch((err) => {
   console.error("db connection not established");
})





//! feed API - GET /feed - get all the users from the database
// app.get("/feed",async function(req,res) {
//    try{
//       const users = await User.find({});  //it will return all the user documents
//       res.send(users);
//    }
//    catch{
//       res.status(400).send("Something went wrong");
//    }
// });

//! Update data of the user
// app.patch("/user/:userId", async function(req,res){
//    const userId = req.params?.userId;
//    const data = req.body;
//    //we want some fields to be updated not all fields
   

//    try{
//       const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];
//       const isUpdateAllowed = Object.keys(data).every((k) => {   
//          return ALLOWED_UPDATES.includes(k);  
//       })
//       if(!isUpdateAllowed){
//          throw new Error("Update not allowed");
//       };
//       await User.findByIdAndUpdate({_id : userId},data,{ returnDocument : "before", runValidators : true, });
//       res.send("User updated successfully");
//    }
//    catch(err){
//       res.send("Update Failed :" + err.message);
//    }
// })








//!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Notes for learning pusrpose
//i want all admin requests to be authorized so I will create one middleware /admin to check for authorized admin
// so we will create one middleware for all admin requests, so we do not need to write authorization code separately for each request

//handle auth middleware for all GET, POST... requests that's why we will use 'use' function for this middleware
// app.use("/admin", adminAuth);

// app.get("/admin/getAllData", (req,res) => {
//    res.send("all data sent");
// });

// app.delete("/admin/deleteUser", (req,res) => {
//    res.send("deleted a user");
// });

// //there is only one route for user, so we can write userAuth func here only.
// app.get("/user", userAuth, (req,res) => {
//    res.send("User data sent");
// })





//! GET / user-profile => it checks all the app.xxx("matching route") functions
//!  GET / user-profile => goes through the middleware chain => request handler (the func that is actually sending the response)
app.use("/", function(req,res,next) {
   // res.send("Hello Citu");
   next();
})

app.get("/user-profile", function(req,res,next){
   // res.send("User Data");
   next();
},
function(req,res,next) {
   res.send("user data 2");
 
});








//!this will only handle GET call to /user
app.get("/user",function(req,res) {
   console.log(req.query);   //!this how we can read the query parameters
   res.send({ "firstName" : "Citu", "lastName" : "Sangwan"});
})

app.post("/user", function(req,res) {
   res.send("Data successfully saved to the database");
})

//!here b is optional, it will work for both /ac and /abc
app.get("/ab?c",function(req,res){
   res.send("something something");
})

//! we can write anything in place of * but this route should start with ab and end with cd
app.get("/ab*cd",function(req,res) {
   res.send("nothing nothing");
})

//!here bc will be optional
app.get("/a(bc)?e",function(req,res){
   res.send("bogambo khush hua");
})


//here we are listening to diff types of requests

//!this will match all the http method API calls to /test
// app.use("/test",(req,res) => {
//    res.send("Hello from test page!");    //!this func is called request handler or route handler
// });


// app.use("/hello", (req,res) => {
//    res.send("Hello World!");   
// });

// app.use("/", (req,res) => {
//    res.send("Hello from server!");  //always put this url in last otherwise other url will not work
// });

