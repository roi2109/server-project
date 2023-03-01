const { cardValidationWithJoi,Card,userValidationWithJoi,signInValidation,User } = require("./db");
const bcrypt = require('bcrypt');
const _= require("lodash")



//USERS
const createUser=async(req,res)=>{
    const { error } = userValidationWithJoi(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    let user=await User.findOne({email:req.body.email})

    if(user){
        res.status(400).send("user is already registred")
        return
    }
    const {name,email,password,biz}=req.body
     user= await new User({name:name,email:email,password:await bcrypt.hash(password, 12),biz:biz}).save()
    res.send(_.pick(user,["name","email"]))
}

const findUser=async (req,res)=>{
    const user=
    await User.findById({_id:req.user._id },{password:0})
    res.send(user)
}

const userSignIn=async(req,res)=>{
    const { error } = signInValidation(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }


    const user= await User.findOne({email:req.body.email})
    if (!user){
    res.status(400).send("invalid email")

     return
    }
    const isValidPassword=await bcrypt.compare(req.body.password,user.password)
    if (isValidPassword){
    const token=await user.generateToken()
    res.send({token})
    }else{
        res.status(400).send("incorrect password")
    }
   
}


//CARDS
const createCard=async (req,res) =>{
   
    const { error } = cardValidationWithJoi(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    try {
        const card=await new Card({...req.body,bizImage:req.body.bizImage|| "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",user_id:req.user._id}).save()
    res.send(card)
    } catch (error) {
        console.log(error)
    }
    }
    
  const deleteCard = async(req,res)=>{
        const deleteCard=await Card.findOneAndDelete({_id:req.params.id,user_id:req.user._id})
    res.send(deleteCard)
    }

    const updateCard=async(req,res)=>{
        const updatedCard=await Card.findOneAndUpdate({ _id: req.params.id,user_id:req.user._id }, { ...req.body }, { new: true })
        
          res.send(updatedCard)
      }
const getAllCards=async(req,res)=>{
          const cards = await Card.find({user_id:req.user._id});
         
          res.send(cards)
      }


    


    module.exports={createCard,deleteCard,updateCard,createUser,findUser,userSignIn,getAllCards}