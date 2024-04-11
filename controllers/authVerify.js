const jwt = require('jsonwebtoken');
const verifyToken = (token) => {
   
   let reqUser = null;
  
   if(!token){
      return null;
   }
   
   jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user) => {
      
      if(err){
         return null
      }
      reqUser = user;
   })
   
   return reqUser;
}
const verifyAdmin = (req,res,next) => {
   const user = verifyToken(req.headers.authorization);
   
   if(user && user.role === 'admin'){
      next()
   }
   else{
       res.status(401).json({  message: "Not Authenticated" })
   }
}
const verifyUser = (req,res,next) => {
   const user = verifyToken(req.headers.authorization);
   // console.log(user);
   // console.log(req.headers.authorization)
   if(user && (user.role === 'user' || user.role === 'admin')){
      next()
   }
   else{
       res.status(401).json({  message: "Not Authenticated" })
   }
}
module.exports = {verifyAdmin,verifyUser};