const express = require("express");

const app = express();
//!this will only handle GET call to /user
app.get("/user",(req,res) => {
   console.log(req.query);   //!this how we can read the query parameters
   res.send({ "firstName" : "Citu", "lastName" : "Sangwan"});
})

app.post("/user", (req,res) => {
   res.send("Data successfully saved to the database");
})

//!here b is optional, it will work for both /ac and /abc
app.get("/ab?c",(req,res) => {
   res.send("something something");
})

//! we can write anything in place of * but this route should start with ab and end with cd
app.get("/ab*cd",(req,res) => {
   res.send("nothing nothing");
})

//!here bc will be optional
app.get("/a(bc)?e",(req,res) => {
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

app.listen(3000, () => {
   console.log("server is listening on port 3000");
});