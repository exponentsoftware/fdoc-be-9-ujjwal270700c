const TodoModel=require('../models/todo.model')
const AppError=require('../utils/AppError')

exports.create=async (req,res,next) =>{
    try {
        const userId=req.user._id;
        if(!userId){
            return next(new AppError("Please login to get access!",401))
        }
        const {title,category,complete}=req.body
        const data={
            title,
            complete,
            category,
            createdBy:userId
        }
        const newTodoList=await TodoModel.create(data)
        return res.status(201).json({
            status:"Success",
            message:"Data saved successfully!",
            data:newTodoList
        });
    } catch (error) {
        next(error);
    }
}

exports.getAllList=async(req,res,next)=>{
   try {
       const userId=req.user._id;
       const type=req.user.role;
       if(!userId){
        return next(new AppError("Please login to get access!",401))
    }
       let todoLists;
       if(type ==="admin"){
        todoLists=await TodoModel.find().sort({createdAt:-1})
       }else{
        todoLists=await TodoModel.find({userId}).sort({createdAt:-1})
       }    
       return res.status(201).json({
        status:"Success",
        data:todoLists
    });   
   } catch (error) {
    next(error);
   }
}

