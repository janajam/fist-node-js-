const express = require("express");
const {
  register,
  login,
  logout,
  refreshAccessToken,
  createCSRFToken,
} = require("../controller/authController");
const {verifyRefreshToken, verifyCSRFToken}=require('../middleware/authMiddlewar');
const { registerValidator, loginValidator } = require("../validator/authValidator");
const{validate}=require('../middleware/validationMiddleware');
const { loginLimiter } = require("../middleware/rateLimitMiddleware");
const authRouter = express.Router();

authRouter.post("/register", registerValidator,validate,register);
authRouter.post("/login",loginLimiter, loginValidator,validate,login);
authRouter.post('/refresh',verifyCSRFToken,verifyRefreshToken,refreshAccessToken)
authRouter.post(
  "/logout",
  verifyRefreshToken,
  logout
);
module.exports = authRouter;
