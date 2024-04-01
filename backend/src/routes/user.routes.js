import { Router } from "express"
import { registerUser,loginUser,updateUser,logoutuser,refreshAccessTokenRegenrate,getCurrentUser } from "../controller/user.controller.js"
import jwtverify from "../middleware/jwt.middleware.js"

const router = Router()
   
router.post('/signup',registerUser)
router.post('/login',loginUser)
router.patch('/update',jwtverify,updateUser) 
router.get('/logout',jwtverify,logoutuser)
router.get('/currentuser',jwtverify,getCurrentUser)
router.post('/refreshregenerate',refreshAccessTokenRegenrate)
  
 


export default router  