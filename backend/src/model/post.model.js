import mongoose,{Schema} from "mongoose";


const postScheama = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    featuredImage:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
},{timestamps:true})





export const Post = mongoose.model('Post',postScheama)