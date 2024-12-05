const express = require('express')
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const { catchAsync } = require('../services/catchAsync')
const { checkFriendshipStatus, changeFriendshipStatus } = require('../controllers/freindShip.controller')

const router = express.Router()

router.route('/friendship/:id')
.get(isAuthenticated,catchAsync(checkFriendshipStatus))
.post(isAuthenticated,catchAsync(changeFriendshipStatus))
module.exports = router