const jwt=require('jsonwebtoken');
const User=require('../models/user.model');
const AppError=require('../utils/AppError');

const signToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRES_IN,
  });
}

const createSendToken=(user,statusCode,req,res)=>{
    const token=signToken(user._id);
    user.password=undefined;
    user.__v=undefined;
    res.status(statusCode).json({
        status:"Success",
        token,
        data:{
            user,
        }
    });
};

exports.signup=async(req,res,next)=>{
try {
  const {userName,email,password,role,number}  = req.body;
  const newUser=await User.create({
      userName,
      email,
      password,
      role,
      number,
  });
  createSendToken(newUser,201,req,res);
  }catch (err) {
    if(err.code && err.code == 11000){
        return next(new AppError("Email or number is already exist!",400));
    }
    next(err);
  }  
}

exports.login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return next(new AppError("Please provide email and password!",400));
        }
        const user=await User.findOne({email}).select("+password");
        console.log(user);
        if(!user || !user.password || !(await user.correctPassword(password,user.password))){
            return next(new AppError("Incorrect email or password",401));
        }
        createSendToken(user,200,req,res);
    } catch (error) {
        next(error)
    }
}

exports.protect=async(req,res,next)=>{
     try {
         let token;
         if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
             token=req.headers.authorization.split(" ")[1];
         }
         if(!token){
             return next(new AppError("You are not logged in! Please login to get access.",401))
         }
         const decoded=await jwt.verify(token,process.env.JWT_SECRET)
         const currentUser=await User.findById(decoded.id);
         if(!currentUser){
             return next( new AppError("The user belonging to this token does no longer exist.",401))
         }
         req.user=currentUser;
         next();
     } catch (err) {
         if(err.name === "JsonWebTokenError"){
             return next( new AppError("Invalid token. Please login again!",401));
         }
         if(err.name === "TokenExpiredError"){
            return next(
                new AppError("Your token has expired! Please login again",401)
            )
         }
       next(err);  
     }
};
exports.adminMiddleware=async(req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token=req.headers.authorization.split(" ")[1];
        }
        if(!token){
            return next(new AppError("You are not logged in! Please login to get access.",401))
        }
        const decoded=await jwt.verify(token,process.env.JWT_SECRET)
        const currentUser=await User.findById(decoded.id);
        if(!currentUser){
            return next( new AppError("The user belonging to this token does no longer exist.",401))
        }
        if(currentUser.role ==='admin'){
            req.user=currentUser;
            next();
        }else{
            return next( new AppError("only admin can access this route.",401))
        }
    } catch (err) {
        if(err.name === "JsonWebTokenError"){
            return next( new AppError("Invalid token. Please login again!",401));
        }
        if(err.name === "TokenExpiredError"){
           return next(
               new AppError("Your token has expired! Please login again",401)
           )
        }
      next(err);  
    }
};