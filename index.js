require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user")
const session = require("express-session");
const auth = require("./middlewares/auth");

mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTION).then( () => console.log("Connection established"))

app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true
  }
}))
app.use(express.static("./public"))
app.get("/index.html",(req,res)=>{
})
app.use("/users", require("./routes/users"))
app.use(auth)
app.use("/todos", require("./routes/todos"))
app.use((req,res)=>{
    res.status(404).json({message:"404 not found"})
})
app.listen(process.env.PORT || 3000 , () => {
    console.log("listening on port" , 3000);
})
