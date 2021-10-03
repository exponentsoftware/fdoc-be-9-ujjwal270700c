const CommentModel=require('../models/comment.model')
const TodoModel =require('../models/todo.model')
const AppError=require('../utils/AppError')

exports.create=async (req,res,next) =>{
    try {

        const {todoId}=req.params
        console.log(todoId);
        const todo=await TodoModel.findById(todoId)
        if(!todo){
            return next(new AppError("todo is not belong to this id!",401))
        }
        const userId=req.user._id;
        if(!userId){
            return next(new AppError("Please login to get access!",401))
        }
        const {text}=req.body
        const data={
            text,
            BelongTo:todoId,
            postBy:userId
        }
        const newTodoList=await CommentModel.create(data)
        return res.status(201).json({
            status:"Success",
            message:"Data saved successfully!",
            data:newTodoList
        });
    } catch (error) {
        next(error);
    }
}

exports.getCommentsByTodo=async(req,res,next)=>{
    try {
        const {todoId}=req.params
        const todo=await CommentModel.find({BelongTo:todoId})
        if(!todo){
            return next(new AppError("todo is not belong to this id!",401))
        }
        return res.status(201).json({
            status:"Success",
            data:todo
        });  
    } catch (error) {
        next(error)
    }
   
}
exports.update_comment = async (req, res) => {
    try {
        const {role,_id}=req.user
        const todo=await CommentModel.findOne({postBy:_id})
        if(!todo){
            return next(new AppError("todo is not belong to this user so anable to delete!",401))
        }
        if(role ==="admin" || todo){
            const comment = await Comment.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },{new:true});
            res.status(200).json(comment);
        }
     
    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}

exports.delete_comment = async (req, res) => {
    try {
        const {role,_id}=req.user
        const todo=await CommentModel.findOne({postBy:_id})
        if(!todo){
            return next(new AppError("todo is not belong to this user so anable to delete!",401))
        }
        if(role ==="admin" || todo){
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment has been deleted");
        }
      
    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}