import jwt from "jsonwebtoken"
import asynhandler  from "../utils/asynhandler.js"
import apiError from "../utils/apierror.js"
import { User } from "../model/user.model.js"


const jwtverify = asynhandler(async(req,res,next)=>{
try {
        const accessToken =await req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "")
    
        if(!accessToken){       
            throw new apiError(400,"aceess token is not found")
        }
        
    
       const decode = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
       if(!decode){
        throw new apiError(400,"access token cannot be decoded")
       }
   
    
       const userFound =  await User.findById(decode?._id)
       if(!userFound){
        throw new apiError(400,"cannot found user")
       }
       
    
       req.user = userFound 
       

       next()
} catch (error) {
    throw new apiError(401,error?.message || "invalid access token")
}

})

export default jwtverify