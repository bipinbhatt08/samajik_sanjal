const express = require('express')
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const { catchAsync } = require('../services/catchAsync')
const { createPost } = require('../controllers/post.controller')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router.route('/post').post(isAuthenticated,upload.array('photos',10),catchAsync(createPost))

module.exports = router