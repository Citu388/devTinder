const express = require("express");

const app = express();

//here we are listening to diff types of requests
app.use("/test",(req,res) => {
   res.send("Hello from test page!");    //this func is called request handler
});


app.use("/hello", (req,res) => {
   res.send("Hello World!");   
});

app.use("/", (req,res) => {
   res.send("Hello from server!");  //always put this url in last otherwise other url will not work
});

app.listen(3000, () => {
   console.log("server is listening on port 3000");
});