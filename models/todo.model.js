const mongoose=require('mongoose');

const todoSchema= new mongoose.Schema({
  title:{
    type:String,
    required:[true,"Please tell us Title"]
   },
  complete: {
      type:Boolean,
      default:false
   },
   category:{
       type:String,
       required:[true,"Please tell us Category"],
       enum:["work","hobby","task"]
   },
   createdBy:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:[true,"createdby must belong to a User!"]
   },
   tags : [{ type: mongoose.Schema.Types.ObjectId, ref: 'tag' }]
},{timestamps:true})

module.exports= mongoose.model('todo',todoSchema);