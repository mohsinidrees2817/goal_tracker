const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware') 
const connectDB = require('./config/db')

const port = process.env.PORT || 5000

connectDB()
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/api/goals' , require('./routes/goalRoutes'))
app.use('/api/users' , require('./routes/userRoutes'))

app.use('/api/allusers' , require('./routes/adminUserroutes'))
app.use('/api/allgoals' , require('./routes/adminGoalroutes'))


app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))