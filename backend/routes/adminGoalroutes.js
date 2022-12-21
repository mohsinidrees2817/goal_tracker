const express = require('express')
const router = express.Router()
const {  getAllGoals, updateGoalsAsadmin, deleteGoalsAsadmin ,setGoalsAsadmin} = require('../controllers/goalcontrollers')

const { auth }= require('../middleware/authMiddleware')


router.route('/').get(auth.superAdminAuth, getAllGoals)
router.route('/:id').put(auth.superAdminAuth, updateGoalsAsadmin).delete(auth.superAdminAuth, deleteGoalsAsadmin).post(auth.superAdminAuth ,setGoalsAsadmin)
module.exports = router