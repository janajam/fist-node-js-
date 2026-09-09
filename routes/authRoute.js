const express =require('express');
const {register}=require('../controller/authController')

const authRouter = express.Router();

authRouter.post('/register',register)


module.exports = authRouter;