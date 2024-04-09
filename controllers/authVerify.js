const jwt = require('jsonwebtoken');
const verifyToken = (token) => {
   let reqUser = null;
   console.log(process.env.JWT_SECRET_KEY)
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
   const user = verifyToken(req.cookies.accessToken);
   console.log(user);
   console.log(req.cookies.accessToken)
   if(user && user.role === 'admin'){
      next()
   }
   else{
       res.status(401).json({  message: "Not Authenticated" })
   }
}
const verifyUser = (req,res,next) => {
   const user = verifyToken(req.cookies.accessToken);
   console.log(user);
   console.log(req.cookies.accessToken)
   if(user && user.role === 'user'){
      next()
   }
   else{
       res.status(401).json({  message: "Not Authenticated" })
   }
}
module.exports = {verifyAdmin,verifyUser};