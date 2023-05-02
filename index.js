const express=require('express');
const {connection}=require("./db")
const {userRouter}=require("./routes/user.route")
const {authenticator}=require("./middleware/authentication.middleware")
const {postRouter}=require("./routes/post.route")
require("dotenv").config
const app=express();

app.use(express.json());


app.use("/users",userRouter)
app.use("/posts",authenticator)
app.use("/posts",postRouter)

app.listen(process.env.PORT, async ()=>{
    try {
        await connection 
        console.log("connected to db and running port at 8080")
    } catch (error) {
        console.log(error.message)
    }
})








// {
//     "name":"Vivek",
//   "email":"vivek@gmail.com",
//   "gender":"male",
//   "password":"vivek@123"
//  }




//6450e7dda714ded1a129b963



// {
//     "title":"paraaa",
//   "body": "forrrrrrrrrr",
//   "device":"Desktop"
//  }