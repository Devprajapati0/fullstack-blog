import asynhandler from "../utils/asynhandler.js";
import apiError from "../utils/apierror.js";
import apiResponse from "../utils/apiresponse.js";
import { User } from "../model/user.model.js";
import { Post } from "../model/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
 
const createPost = asynhandler(async(req, res) => {
    try {
         const { title, content, isActive = false } = req.body;
    
         if (!(title || content || isActive)) {
            throw new apiError(400, "either Title, content, and isActive is not been provided");
         }
         console.log(req.file);
         const url = await req.file?.path; 
         console.log("url", url); 
         if(!url){
            return res.json(
                new apiResponse(
                    200,
                    null,
                    "file is required"
                )
            )
         }

         const fileUploaded =  await uploadOnCloudinary(url);
         if (!fileUploaded) {
            throw new apiError(400, "Cloudinary upload failed");
         }

         const postExisted = await Post.findOne({
            title: title,
            content: content,
            featuredImage: fileUploaded?.url,
            isActive: isActive,
            owner: req.user?._id
         });

         console.log(postExisted);

         if (postExisted) {
            return res.status(200).json(new apiResponse(200,null, "Post already exists"));
         }

         const post = await Post.create({
            title: title,
            content: content,
            featuredImage: fileUploaded.url,
            isActive: isActive,
            owner: req.user?._id
         });

         if (!post) {
            throw new apiError(400, "Failed to create post");
         }

         return res.status(200).json(new apiResponse(200, post, "Post created successfully"));
    } catch (error) {
        throw error;
        res.status(400).json({ success: false, error: error.message });
    }
});


  const editPost = asynhandler(async(req,res)=>{
   try {
     const {title,content,isActive} = req.body;
     const {postId} = req.params;
 
 
     if(!postId){
         throw new apiError(400,"postID is required")
     }
 
     if(!(title || content  || isActive || req.file)){
         return res.status(200).json(
             new apiResponse(200,
                 "change atleast one thing")
         )
   }
 
   const updatedfeilds ={}
 
   if(title){
     updatedfeilds['title'] = title
   }
 
   if(content){
     updatedfeilds['content'] = content
   }

   if(isActive){
     updatedfeilds['isActive'] = isActive
   }

   const newurl = req.file?.path;

   if(newurl){
 
    const updatedimage = await uploadOnCloudinary(newurl);
    if(!updatedimage){
     throw new apiError(400,"problem in uplaoding updated image in clodinary")
    }
 
    updatedfeilds['featuredImage'] = updatedimage?.url
   
}

  const updatedpost = await Post.findByIdAndUpdate(
     postId,
     {
         $set:updatedfeilds
     },
     {new :true}
   )
 
   if(!updatedpost){
     throw new apiError(400,"problem in updated post")
   }
 
   return res.status(200).json(
     new apiResponse(
         200,
         updatedpost,
         "successfully updated post"
     )
   )
 
   } catch (error) {
    throw error
   } 
}
  )

  const deletePost = asynhandler(async (req,res)=>{
    const {postId} = req.params;
    if(req.user){
        return res.status(200).json(
            new apiResponse(
                200,
                null,
                "login first"
            )
        )
    }
    
    if(!postId){
        throw new apiError(400,"postID is required")
    }

   const postupdate =  await Post.findByIdAndDelete(
        postId,
        {
            new :true
        }
    )

    if(!postupdate){
        throw new apiError(400,"problem in updting the post")
    }

    return res.status(200).json(
        new apiResponse(
            200,
            "deleted successfully"
        )
    )
  })

  const getPost = asynhandler(async (req,res)=>{
    const {postId} = req.params;

    if(!postId){
        throw new apiError(400,"postID is required")
    }

    const postFound =  await Post.findById(postId)

    if(!postFound){
        throw new apiError(400,"error while finding the post")
    } 

    return res.status(200).json(
        new apiResponse(
            200,
            postFound,
            "post found successfully"
        )
    ) 
 
  })
 
  const allPostOfAllUsers = asynhandler(async (req,res)=> {

   const data = await Post.aggregate([
        {
            $match:{
                isActive: true
            }
        },
        {
            $lookup:{ 
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"owner"
            }
        } ,
        {
            $addFields:{
                username:"$owner.username"
            }
        }
    ])

    if(!data){
        throw new apiError(400,"error while finding all post by all users")
    }

    return res.status(200).json(
        new apiResponse(
            200,
            data,
            "all post by all user found successfully"
        )
    )
  })
  
  const getAllPosts = asynhandler(async (req, res) => {
    try { // Log the user ID
        const data = await Post.find({ isActive: true });

        console.log("Posts found:", data); // Log the posts found

        if (!data || data.length === 0) {
            throw new apiError(404, "No posts found for the user");
        }

        return res.status(200).json(
            new apiResponse(200, data, "All posts found successfully")
        );
    } catch (error) {
        console.error("Error in getAllPosts:", error); // Log any errors
        throw error;
    }
});


 export {createPost,editPost,deletePost,getPost,allPostOfAllUsers,getAllPosts}


