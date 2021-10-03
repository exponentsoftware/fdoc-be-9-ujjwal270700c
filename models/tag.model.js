const mongoose=require('mongoose');

const tagSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please tell us Title"]
       },
       category:{
           type:String,
           required:[true,"Please tell us Category"],
           enum:["work","hobby","task"]
       },
   addedBy:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:[true,"createdby must belong to a todo!"]
   }
},{timestamps:true})

module.exports= mongoose.model('tag',tagSchema);