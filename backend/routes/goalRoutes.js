const express = require('express')
const router = express.Router()
const {getGoals,setGoals,deleteGoals, updateGoals} = require('../controllers/goalcontrollers')

const { auth }= require('../middleware/authMiddleware')


router.route('/').get(auth.superAdminAndUserAuth, getGoals).post(auth.superAdminAndUserAuth, setGoals)
router.route('/:id').put(auth.superAdminAndUserAuth, updateGoals).delete(auth.superAdminAndUserAuth, deleteGoals)

module.exports = router