const jwt=require("jsonwebtoken")
module.exports=(req,res,next)=>{
   const token=req.header("x-auth-token")
   if(!token){res.status(404).send("invalid token")
return}
try {
   const payload= jwt.verify(token,process.env.PRIVATE_KEY);
   req.user=payload
   next()
} catch (error) {
    console.log(error)
}
}