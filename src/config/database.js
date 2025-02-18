// "mongodb+srv://citusangwan356:gH7oQD0F1lCoi8AX@cluster0.j6qzf.mongodb.net/"

const mongoose = require('mongoose');

//to connect to cluster
// mongoose.connect("mongodb+srv://citusangwan356:gH7oQD0F1lCoi8AX@cluster0.j6qzf.mongodb.net/");

//better to use ansync await becoz connect func will return a promise that will tell whether the connection has been made or not

const connectDB = async () => {
   //! write database name after / to connect to a specific database in a cluster,
   //! here we want to connect to devTinder db so we wrote devTinder
   //! you do not need to manually create devTinder db, just write here and mongoose will automatically create
   await mongoose.connect("mongodb+srv://citusangwan356:gH7oQD0F1lCoi8AX@cluster0.j6qzf.mongodb.net/devTinder");
};


//this is not the right way becoz we need to first connect to DB then listen to incoming requests, so we will export this func 
// connectDB

module.exports = connectDB;
// connectDB().then(() => {
//     console.log("database connection established");
// }).catch((err) => {
//     console.error("db connection not established");
// })
