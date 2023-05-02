const {Post}=require("../models/post.model")
const {Router}=require("express")

const postRouter=Router()

postRouter.get("/",async(req,res)=>{
   
    try {
        const {userId}=req.body.userId;
        const {device=["Tablet", "Mobile","Laptop"]}=req.query;
        const posts= await Post.find({$and:[{userId},{device:{$in:device}}]});
        // 
        // let {device}=req.query;
        // let query={};
        // query.userId=req.body.userId;
        // if(device){
        //     query.device=device
        // }
        //  let post = await Post.find(query)
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})
postRouter.post("/create",async(req,res)=>{
    try {
        const data= req.body;
        const newpost= new Post(data);
        await newpost.save();
        res.status(200).send({"msg":"New post created successfully","post":newpost})
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})

postRouter.patch("/update/:id", async(req,res)=>{
    try {
        const data= req.body;
        const id= req.params.id;
        const updated= await Post.findByIdAndUpdate(id,data);
        res.status(200).send({"msg": "post updated successfully","post": updated})
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})



postRouter.delete("/delete/:id", async(req,res)=>{
    try {
       
        const id= req.params.id;
        const deleted= await Post.findByIdAndDelete(id);
        res.status(200).send({"msg": "post deleted successfully","post": deleted})
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})

module.exports={postRouter}