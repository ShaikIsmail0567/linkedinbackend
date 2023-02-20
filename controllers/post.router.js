const express=require("express")
const postrouter=express.Router()
const {usermodel}=require("../models/user.model")
const {postmodel}=require("../models/posts.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

postrouter.get("/",async (req,res)=>{
    const query1=req.query.device1
    const query2=req.query.device2
    let sortquery={}
    if(query1){
sortquery={"device":"mobile"}
    }
    if(query2){
        sortquery={"device":"tablet"}
            }
    const user=req.body.user
    const posts = await postmodel.find({user}).sort(sortquery)
    res.send(posts)
})
postrouter.delete("/delete/:id",async(req,res)=>{
    const postID=req.params.id
    await postmodel.findByIdAndDelete({_id:postID})
    res.send(`post with ${postID} has been deleted`)
})
postrouter.patch("/update/:id",async(req,res)=>{
    const postID=req.params.id
    const payload=req.body
    await postmodel.findByIdAndUpdate({_id:postID},payload)
    res.send(`post with ${postID} has been updated`)
})
postrouter.post("/post",async(req,res)=>{
    const payload=req.body
    await postmodel.insertMany(payload)
    res.send(`posts has been posted`)
})
postrouter.get("/top",async(req,res)=>{

const top=await postmodel.find().sort({no_if_comments:-1})
res.send(top[0])
})
module.exports={postrouter}