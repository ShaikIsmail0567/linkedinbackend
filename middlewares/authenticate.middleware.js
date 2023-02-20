const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"secret",(err,decoded)=>{
            if(decoded){
                req.body.user=decoded.userID
                next()
            }else{
                res.send({"msg":"please login"})
            }
        })
    }else{
        res.send({"msg":"Not Authorized"})
    }
}

module.exports={
    authenticate
}