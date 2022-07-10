//const User = require("../User")

exports.authorize =(...roles)=>{
  return (req,res,next)=>{
      if(!roles.includes(req.body.role)){
         return res.status(403).message("please signin")
    }
    next()
 }
  
}
