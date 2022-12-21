const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const auth =  {
    async superAdminAuth(req, res, next) {

    let token

    if (
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ){
        try {
            // get token from header 
            token = req.headers.authorization.split(' ')[1]

            // verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token 
            req.user = await User.findById(decoded.id).select('-password')
           if (req.user.userType == "admin"){
            console.log("admin accesed")
            next()
            
            } else {
                console.log("wrong user accesed")
                res.status(404).send({
                 message: "Unauthorized admin auth!",
            });
        }
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('not authorizedssss')
        }
    }

    if (!token){
        res.status(401)
        throw new Error('not authorized, no token')
    }

},


async superAdminAndUserAuth(req, res, next) {
    let token

    if (
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ){
        try {
            // get token from header 
            token = req.headers.authorization.split(' ')[1]

            // verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token 
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('not authorized')
        }
    }

    if (!token){
        res.status(401)
        throw new Error('not authorized, no token')
    }

},
}

module.exports = {
    auth
}


