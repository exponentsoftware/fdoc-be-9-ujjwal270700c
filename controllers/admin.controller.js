const todoModel = require("../models/todo.model")
const userModel = require("../models/user.model")
const CommentModel=require('../models/comment.model')
exports.userDetails=async(req,res,next)=>{
    try {
        const User=await userModel.findById(req.params.id)
        const todoList=await todoModel.find({createdBy:req.params.id})
        const comments=await CommentModel.find({postBy:req.params.id})
        const data={
            User:User,
            AllTodo:todoList,
            AllComments:comments
        }
        return res.status(201).json({
            status:"Success",
            message:"Data saved successfully!",
            data:data
        });
    } catch (error) {
        next(error)
    }
}