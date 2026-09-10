const express=require('express')
const { getMe ,updateMe} = require('../controller/meController')
const {verifyToken}=require('../middleware/authMiddlewar')
const meRouter=express.Router()

meRouter.get('/me',verifyToken,getMe)
meRouter.put('/me',verifyToken,updateMe)

module.exports=meRouter
