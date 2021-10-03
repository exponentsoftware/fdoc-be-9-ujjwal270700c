const express=require('express');
const {adminMiddleware}=require('../controllers/user.controller')
const { userDetails} = require('../controllers/admin.controller');
const router=express.Router();

router.route('/user/:id').get(adminMiddleware,userDetails);


module.exports=router