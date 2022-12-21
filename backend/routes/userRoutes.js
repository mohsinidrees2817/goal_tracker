const express = require('express')
const router = express.Router()

const {registerUser, loginUser, getMe, getAllusers } = require('../controllers/usercontrollers')
const { auth } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', auth.superAdminAndUserAuth , getMe)

module.exports = router

