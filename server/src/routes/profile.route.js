const express = require("express")
const router = express.Router()
const {catchAsync}= require('../services/catchAsync')//curly braket kina ki exports. gareko xu 
const { setUpProfile, getProfile, getProfileOfOthers } = require("../controllers/profile.controller")

const { isAuthenticated } = require("../middlewares/isAuthenticated")
const { upload } = require("../middlewares/multer")

const pictureUpload = upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPic', maxCount: 1 }])
router.route('/profile')
.post(isAuthenticated,pictureUpload,setUpProfile)
.get(isAuthenticated,catchAsync(getProfile))
// .patch(pictureUpload,isAuthenticated,catchAsync(editProfile))

router.route('/profile/:id').get(catchAsync(getProfileOfOthers))
module.exports= router