import mongoose from "mongoose";

const connectDb = async()=>{
try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}-blog-fullstack`)
       console.log(`\n mongodb connected || DB: || ${connectionInstance.Connection.host}`);
} catch (error) {
    console.log("database connection || DB || index.db.js ||",error);
    process.exit(1)
}
}

export default connectDb