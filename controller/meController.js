const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

exports.getMe = async (req, res) => {
  try {
    const id = req.user.id;
    const me = await User.findById(id);
    if (!me) {
      return res.status(404).json({ message: "data dose not found" });
    }
    res.status(200).json(me);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { name, email } = req.body;
    const id = req.user.id;
    const me = await User.findById(id);
    if (!me) {
      return res.status(404).json({ message: "data dose not found" });
    }
    const updatedMe = await User.findByIdAndUpdate(
      id,
      { name, email },
      {
        new: true,
      },
    );
    return res
      .status(200)
      .json({ message: "data updated successfully", users: updatedMe });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const id = req.user.id;
    const { password, newPassword, confirmPassword } = req.body;

    const userExist = await User.findById(id).select("+password");

    if (!userExist) {
      return res.status(404).json({ message: "data dose not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "current password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "new password and confirm password do not match" });
    }

    const changedPassword = await bcrypt.hash(newPassword, 10);

    userExist.password = changedPassword;

    await userExist.save();
    
    return res.status(200).json({ message: "password changed successfully" });
  } 
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
