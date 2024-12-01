const express= require('express')
const router = express.Router()
const { registerNewUser, loginUser, forgetPassword, verifyOTP, resetPassword } = require('../controllers/user.controler')


router.post('/register',registerNewUser)
router.post('/login',loginUser)
router.post('/forgetPassword',forgetPassword)
router.post('/verifyOtp',verifyOTP)
router.post('/resetPassword',resetPassword)

module.exports = router