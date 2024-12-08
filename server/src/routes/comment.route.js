const express = require('express')
const { addComment, editComment, deleteComment } = require('../controllers/comment.controller')
const {isAuthenticated}=require('../middlewares/isAuthenticated')
const {catchAsync} = require('../services/catchAsync')
const router = express.Router()

router.route('/comment')
.post(isAuthenticated, catchAsync(addComment))
router.route('/comment/:id')
.put(isAuthenticated,catchAsync(editComment))
.delete(isAuthenticated,catchAsync(deleteComment))
module.exports = router