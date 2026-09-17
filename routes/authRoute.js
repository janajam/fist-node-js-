const express = require("express");
const {
  register,
  login,
  logout,
  refreshAccessToken,
} = require("../controller/authController");
const {verifyRefreshToken}=require('../middleware/authMiddlewar');
const { registerValidator, loginValidator } = require("../validator/authValidator");
const{validate}=require('../middleware/validationMiddleware');
const { loginLimiter } = require("../middleware/rateLimitMiddleware");
const authRouter = express.Router();

authRouter.post("/register", registerValidator,validate,register);
authRouter.post("/login",loginLimiter, loginValidator,validate,login);
authRouter.post('/refresh',verifyRefreshToken,refreshAccessToken)
authRouter.post(
  "/logout",
  verifyRefreshToken,
  logout
);

module.exports = authRouter;
