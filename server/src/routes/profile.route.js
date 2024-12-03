const express = require("express")
const router = express.Router()
const {catchAsync}= require('../services/catchAsync')//curly braket kina ki exports. gareko xu 
const { setUpProfile } = require("../controllers/profile.controller")

const { isAuthenticated } = require("../middlewares/isAuthenticated")
const { upload } = require("../middlewares/multer")

const pictureUpload = upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPic', maxCount: 1 }])
router.route('/setUpProfile').post(pictureUpload,isAuthenticated,catchAsync(setUpProfile))

module.exports= router