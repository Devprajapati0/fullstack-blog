import { Router } from "express";
import jwtverify from "../middleware/jwt.middleware.js";
import {upload} from "../middleware/multer.middleare.js"
import {createPost,
    editPost,
    deletePost,
    getPost,
    allPostOfAllUsers,
    getAllPosts} from "../controller/post.controller.js"
 
const router = Router()

router.get('/',allPostOfAllUsers)

router.use(jwtverify)



router.post('/createpost', upload.single('featuredImage'), createPost);
router.patch('/editpost/:postId', upload.single('featuredImage'), editPost);
router.delete('/deletepost/:postId', deletePost);
router.get('/getallpost', getAllPosts); // Removed the route parameter from here
router.get('/:postId', getPost);


export default router   