
const express=require('express');
const router =express.Router();
const {protect}=require('../controllers/user.controller')
const {create, getCommentsByTodo}=require('../controllers/comment.controller')

router.route('/todo/:todoId').post(protect,create)
router.route('/todo/:todoId').get(protect,getCommentsByTodo)

module.exports =router