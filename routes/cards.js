const express=require("express")
const {createCard, deleteCard, updateCard,getAllCards}=require("../service")
const middleware=require("../middleware/middleware")
const router=express.Router()
router.post("/",middleware,createCard)
router.delete("/:id",middleware,deleteCard)
router.put("/:id",middleware,updateCard)
router.get("/",middleware,getAllCards)

module.exports=router