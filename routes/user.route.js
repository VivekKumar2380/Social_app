const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");

const {User}=require('../models/user.model')

const {Router}=require('express')

const userRouter=Router();

userRouter.post("/register", async(req,res)=>{
    try {
        const payload=req.body;
        const hashedpassword= await bcrypt.hashSync(payload.password,5);
        payload.password=hashedpassword;

        const newuser=new User(payload);
        await newuser.save();
        res.status(200).send({"msg": "User registered successfully"})
    } catch (error) {
        res.status(400).send({"error":error.messsage})    }
})


userRouter.post("/login", async(req,res)=>{
    try {
        const payload=req.body
        const user=await User.findOne({email:payload.email});
        if(!user) return res.status(200).send("please sign in for login")
        const isCorrect= await bcrypt.compareSync(payload.password,user.password)
        if(isCorrect){
            const token =await jwt.sign({email:user.email, userId:user._id}, "heythisisvivek")
            res.status(200).send({"msg":"Login Success","token":token})
        }else{
            res.status(200).send({"msg":"Wrong Credentials"});
        }
    } catch (error) {
        res.status(400).send({"msg":error.messsage})
    }
})

module.exports={userRouter};