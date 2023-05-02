const jwt=require("jsonwebtoken")

const authenticator= async(req,res,next)=>{
    try {
        let token =req.headers?.authorization;
        if(!token){
             res.status(401).send({"message":"Not  authorized"})
        }
        token=req.headers.authorization.split(" ")[1];
         const validtoken = await jwt.verify(token,"heythisisvivek");
         if(!validtoken){
              res.status(401).send({"message":"Not  authorized"})
         }
             req.body.userId=validtoken.userId
             next();
         
    } catch (error) {
        res.status(401).send({"message":"Not  authorized"})
    }
}
module.exports={authenticator}