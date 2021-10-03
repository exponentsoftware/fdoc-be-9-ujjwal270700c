
const express=require('express');
const router =express.Router();
const {protect}=require('../controllers/user.controller')
const {create,getAllList}=require('../controllers/todo.controller')

router.route('/').post(protect,create)
router.route('/').get(protect,getAllList)

module.exports =router