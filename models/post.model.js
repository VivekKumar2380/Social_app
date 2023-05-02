const mongoose =require("mongoose")

const UserSchema=mongoose.Schema({
 title:{type:String, required:true},
 body:{type:String, required:true},
 device:{type:String, required:true}

})

const Post=mongoose.model("post",UserSchema)

module.exports={Post};



// title ==> String
// body ==> String
// device ==> String