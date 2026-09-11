const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../model/refrreshTokenModel");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "user already exists " });
    }
    const userPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: userPassword });

    const registerUser = await newUser.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", user: { name, email } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const refreshTokenDoc = new RefreshToken({
      token: refreshToken,
      user: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await refreshTokenDoc.save();

    return res.status(200).json({
      message: "User logged in successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.refreshAccessToken = async (req, res) => {
  try {
    const id = req.user.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "user not found" });
    }
    const tokenExist = await RefreshToken.findOne({
      token: req.refreshToken,
      user: id,
      revoked: false,
    });
    if (!tokenExist) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    if (tokenExist.expiresAt < new Date()) {
      return res.status(401).json({
        message: "Refresh token has expired",
      });
    }

    const accessToken = jwt.sign(
      { id: userExist._id, email: userExist.email, role: userExist.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );
    return res
      .status(200)
      .json({ message: "Access token refreshed successfully", accessToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




exports.logout = async (req, res) => {
  try{
    const id = req.user.id;
    const token =req.refreshToken;
    const tokenExist = await RefreshToken.findOne({
      token: token,
      user: id,
    revoked: false,
    })

    if (!tokenExist) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    tokenExist.revoked = true;
    await tokenExist.save();

    return res.status(200).json({ message: "User logged out successfully" });

  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
}