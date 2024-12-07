const express = require('express')
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const { catchAsync } = require('../services/catchAsync')
const { createPost, getPostById, getPostByUserId } = require('../controllers/post.controller')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router.route('/post')
.post(isAuthenticated,upload.array('photos',10),catchAsync(createPost))
router.route('/post/:postId').get(catchAsync(getPostById))
router.route('/posts').get(catchAsync(getPostByUserId))
module.exports = router