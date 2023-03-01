const express=require("express")
const router=express.Router()
const {userSignIn}=require("../service")
router.post("/",userSignIn)

module.exports=router