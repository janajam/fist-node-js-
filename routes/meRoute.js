const express=require('express')
const { getMe ,updateMe, changePassword} = require('../controller/meController')
const {verifyToken}=require('../middleware/authMiddlewar')
const meRouter=express.Router()

meRouter.get('/me',verifyToken,getMe)
meRouter.put('/me',verifyToken,updateMe)
meRouter.post('/change-password',verifyToken,changePassword)

module.exports=meRouter
