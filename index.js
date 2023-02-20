const express=require("express")
const app=express()
app.use(express.json())
app.use(cors())
const { connection } = require("./config/db")
const { postrouter } = require("./controllers/post.router")
const {userrouter}=require("./controllers/user.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
app.use("/users",userrouter)
app.use(authenticate)
app.use("/posts",postrouter)
app.listen(6500,async()=>{
    try {
        await connection
        console.log("Port is connected to 6500")
    } catch (error) {
        console.log(error)
    }
})