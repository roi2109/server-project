const express=require("express")
const {createUser,findUser}=require("../service")
const middleware=require("../middleware/middleware")
const router=express.Router()
router.post("/",createUser)
router.get("/",middleware,findUser)

module.exports=router