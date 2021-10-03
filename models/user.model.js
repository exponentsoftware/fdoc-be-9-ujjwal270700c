const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const validator=require('validator')


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true, "please tell us your username"],
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        sparse:true,
        trim:true,
        validate:[validator.isEmail, "please provide a valid email"],
    },
    password:{
     type:String,
     minlength:4,
     select:false,
     required:[true, 'please provide us your password']
    },
    number: {
        type : Number,
        required:[true, 'please tell us your number'],
        unique   : true,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
      },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
})

userSchema.pre('save',async function(next){
    this.password =await bcrypt.hash(this.password,12);
    next();
})
userSchema.methods.correctPassword=async function(password,userPassword){
    return await bcrypt.compare(password,userPassword)
}
module.exports=mongoose.model("User",userSchema);