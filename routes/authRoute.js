const express = require("express");
const {
  register,
  login,
  logout,
  refreshAccessToken,
} = require("../controller/authController");
const {verifyRefreshToken}=require('../middleware/authMiddlewar')
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post('/refresh',verifyRefreshToken,refreshAccessToken)
authRouter.post(
  "/logout",
  verifyRefreshToken,
  logout
);

module.exports = authRouter;
