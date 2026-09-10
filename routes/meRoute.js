const express=require('express')
const { getMe } = require('../controller/meController')
const {verifyToken,authorizeRole}=require('../middleware/authMiddlewar')
const meRouter=express.Router()

meRouter.get('/me',verifyToken,getMe)

module.exports=meRouter
