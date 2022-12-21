const express = require('express')
const router = express.Router()


const { getAllusers } = require('../controllers/usercontrollers')
const { auth } = require('../middleware/authMiddleware')


router.get('/', auth.superAdminAuth, getAllusers)


module.exports = router