const express= require('express')
const router = express.Router()
const { registerNewUser, loginUser, forgetPassword, verifyOTP, resetPassword } = require('../controllers/user.controller')
const { catchAsync } = require('../services/catchAsync')


router.route('/register').post(catchAsync(registerNewUser) )
router.route('/login').post(catchAsync(loginUser))
router.route('/forgetPassword').post(catchAsync(forgetPassword))
router.route('/verifyOtp').post(catchAsync(verifyOTP))
router.route('/resetPassword').post(catchAsync(resetPassword))

module.exports = router