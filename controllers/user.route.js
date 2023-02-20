const express=require("express")
const userrouter=express.Router()
const {usermodel}=require("../models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
userrouter.post("/register",async(req,res)=>{
    const {name,email,password,age,city,gender}=req.body;
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err) res.send(err.message)
            else{
                const user=new usermodel({name,email,password:hash,age,gender,city})
                await user.save()
                res.send({"msg":"new user signed up"})
            }
        })
        
    } catch (error) {
        console.log(error)
        res.send({"msg":"something went wrong in registration"})
    }

    
})

userrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        
        const user= await usermodel.find({email})
        // console.log(user)
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"secret")
                    res.send({"msg":"logged in Successfully","token":token})
                }else{
                    res.send("Wrong credentials")
                }
            })
           
        }else{
            res.send("Wrong credentials")
        }
        
    } catch (error) {
        console.log(error)
        res.send({"msg":"something went wrong in login"})
    } 
    // res.send({"msg":"logged in","token":"token...."})
})


module.exports={userrouter}