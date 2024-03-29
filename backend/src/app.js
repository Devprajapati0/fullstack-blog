import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.urlencoded({limit:'16kb',extended:true}))
app.use(cookieParser())
app.use(express.json({limit:'16kb'}))
app.use(express.static("public"))

import userroute from "./routes/user.routes.js"
import postroute from "./routes/post.routes.js"

app.use('/api/v1/users',userroute)
app.use('/api/v1/posts',postroute)

export default app


