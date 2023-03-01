const mongoose=require("mongoose")
const joi=require("joi")
const jwt=require("jsonwebtoken")
mongoose.set('strictQuery', false);
const connect = () =>
  mongoose
    .connect('mongodb://127.0.0.1:27017/cardsDB')
    .then(() => console.log('connected to db'))

    .catch((err) => console.log(err));

    const userSchema = new mongoose.Schema({
        name: {type:String,minLength:2,maxLength:50,required:true},
        email: {type:String,minLength:6,maxLength:255,required:true,unique:true},
        password:{type:String,minLength:6,maxLength:1064,required:true},
        biz:{type:Boolean,required:true,default:false},
        created_at:{type:Date,default:Date.now},
      });
      userSchema.methods.generateToken=function(){
          return jwt.sign({ biz:this.biz,_id:this._id }, process.env.PRIVATE_KEY);
      }
        
const userValidationWithJoi=(user)=>{
  const schema=joi.object({
name:joi.string().min(2).max(50).required(),
email:joi.string().min(6).max(255).required().email(),
password:joi.string().min(6).max(1064).required(),
biz:joi.boolean(),
  })
  return schema.validate(user)
}
const signInValidation=(user)=>{
  const schema=joi.object({
    email:joi.string().min(6).max(255).required().email(),
    password:joi.string().min(6).max(1064).required(),
      })
      return schema.validate(user)
}
const User = mongoose.model('User',userSchema,"users");

      const cardSchema = new mongoose.Schema({
        bizName: {type:String,minLength:2,maxLength:50,required:true},
        bizAddress: {type:String,minLength:6,maxLength:255,required:true},
        bizPhone:{type:String,minLength:9,maxLength:10,required:true},
        bizImage:{type:String,required:true},
        bizDescription:{type:String,minlength:3,maxLength:1064},
        user_id:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
       
      });
const cardValidationWithJoi=(card)=>{
  const schema=joi.object({
bizName:joi.string().min(2).max(50).required(),
bizAddress:joi.string().min(6).max(255).required(),
bizPhone:joi.string().min(9).max(10).required(),
bizImage:joi.string(),
bizDescription:joi.string().min(3).max(1064)
  })
  return schema.validate(card)
}
      const Card = mongoose.model('Card',cardSchema,"cards");

    module.exports={connect,User,userValidationWithJoi,cardValidationWithJoi,Card,signInValidation}
