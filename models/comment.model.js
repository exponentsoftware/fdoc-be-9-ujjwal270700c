const mongoose=require('mongoose');

const commentSchema= new mongoose.Schema({
  text:{
    type:String,
    required:[true,"Please tell us Text"]
   },
   postBy:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:[true,"createdby must belong to a User!"]
   },
   BelongTo:{
    type:mongoose.Schema.ObjectId,
    ref:'todo',
    required:[true,"createdby must belong to a todo!"]
   }
},{timestamps:true})

module.exports= mongoose.model('comment',commentSchema);