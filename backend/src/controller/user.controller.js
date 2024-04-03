import asynhandler from "../utils/asynhandler.js";
import apiError from "../utils/apierror.js";
import apiResponse from "../utils/apiresponse.js";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken"


const generateAccessTokenRefreshToken = async(userid)=>{
 try {
       const userExisted = await User.findById(userid)
       if(!userExisted){
           throw new apiError(400,"user doesnot existed")
       }
   
       const accessToken = await userExisted.generateAccessToken();
       const refreshToken = await userExisted.generateRefreshToken();

       userExisted.refreshToken = refreshToken;
      await userExisted.save({validateBeforeSave:false}) 
    
       return {accessToken,refreshToken} 
 } catch (error) {
    console.log("generateaccessandrefreshtoken::",error); 
 }
   
} 
const getCurrentUser = asynhandler(async(req,res)=>{
    return res.json(
        new apiResponse(        200,
            req.user,
            "cureent user found successfully")
    )
})


const registerUser = asynhandler(async (req,res)=>{
    const {username,email,password} = req.body

    if(!username || !email || !password){
       
         throw new apiError(401,"credential are required");
    }


    const userFound = await User.findOne(
        {
            $or:[{username},{email}]
        }
       )
    console.log(userFound);

    if(userFound){
        return res.status(200).json(
            new apiResponse(
            200,
            null,
            "some user have already registerd using this username or mail")
        )
    }
    
  
      const userCreate = await User.create({
            username:username,
            email:email,
            password:password
        })

        if(!userCreate){
            throw new apiError(400,"user cannot be created")
        }

        return res.status(200).json(
            new apiResponse(
                200,
                userCreate,
                "user created successfully"
            )
        )
    }
)

const loginUser = asynhandler(async(req,res)=>{
    const {email,password} = req.body;

    if(!(email || password)){
        throw new apiError(400,"credentials are required");
    }

   const emailVerified = await User.findOne({
        email:email 
    })

    if(!emailVerified){
       throw new apiError(400,"email must be varified registerd first")
    }

    const passwordVerification = await emailVerified.isPasswordCorrect(password)

    if(!passwordVerification){
        throw new apiError(400,"password must be verified")
    }

    
    const {accessToken,refreshToken} = await generateAccessTokenRefreshToken(emailVerified?._id)

   const options = {
    httpOnly: true,
    secure: true
   } 

   const logineduser = await User.findById(emailVerified?._id).select("-password -refreshToken")

   if(!logineduser){
    throw new apiError(400,"logined user unable to found")
   }
 
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse( 
            200,
            {
                user: logineduser,accessToken,refreshToken
            },
            "User logged in Successfully"
        )
    )   
    
    
})



 const updateUser = asynhandler( async(req,res)=>{
     const {username,email,oldpassword,newpassword} = req.body

     

     if(!(username || email || newpassword || oldpassword)){
         throw new apiError(400,"credential are required");
    }

    if((oldpassword === newpassword) && (req.user.username === username) && (req.user.email === email)){
        return res.status(202).json(
            new apiResponse(
                200,
                "all information is same"
            )
        )
    }

    const matcholdpassword = await req.user.isPasswordCorrect(oldpassword)
    console.log("idpas:",matcholdpassword);
    if(!matcholdpassword){
        throw new apiError(400,"old password isnot correct")
    }

    

    req.user.username = username;
    req.user.email = email
    req.user.password = newpassword;

    req.user.save();

    return res.status(200).json(
        new apiResponse(
            200,
            req.user,
            "updated user"
        )
    )
})

const logoutuser = asynhandler(async(req,res)=>{
    const userFound = await User.findOneAndUpdate(req.user?._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
        new: true
        })
        console.log(userFound);

        if(!userFound){
            throw new apiError(400,"user detail cannot be logogut")
        }

        const options = {
            httpOnly:true,
            secure: true

        }

        return res.status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(
            new apiResponse(
                200,
                "userlogout successfully"

            )
        )

}) 

const refreshAccessTokenRegenrate = asynhandler(async(req,res) => {

    try {
        
                const token = req.cookies?.refreshToken || req.body.refreshToken
         console.log(token);
                if(!token){
                    throw new apiError(400,"invalid haha token")
                }
        
               const decodedUrl = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
               if(!decodedUrl){
                throw apiError(400,"decode url not working")
               }
    
                 console.log("decode:",decodedUrl)
               const user =await User.findById(decodedUrl?._id)
                 console.log("user:",user);
        
             const {accessToken,refreshToken} =await generateAccessTokenRefreshToken(user?._id)
               console.log(accessToken,refreshToken)
        
             const options = {
                httpOnly:true,
                secure:true,
             }
        
             return res.status(200)
             .cookie("accessToken",accessToken,options)
             .json(
                new apiResponse(
                    200, 
                    {accessToken,refreshToken},
                    "Token regenerated successfully"
                )
             )
    } catch (error) {
        throw new apiError(401,"invalid refresh token")
    }})
    
            
    

export {registerUser,
    loginUser,
    updateUser,
    logoutuser,
    refreshAccessTokenRegenrate,
    getCurrentUser,
}