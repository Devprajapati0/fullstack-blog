import connectDb from "./db/index.db.js";
import dotenv from "dotenv"
import app from "./app.js";


dotenv.config()
connectDb()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`🧿 Server is running at port : ${process.env.PORT}`)
    }) 
})
.catch((error)=>{ 
    console.log("Mongo DB connection failed || index.js ",console.error())
})