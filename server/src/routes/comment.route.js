const express = require('express')
const { addComment } = require('../controllers/comment.controller')
const {isAuthenticated}=require('../middlewares/isAuthenticated')
const {catchAsync} = require('../services/catchAsync')
const router = express.Router()

router.route('/comment')
.post(isAuthenticated, catchAsync(addComment))

module.exports = router