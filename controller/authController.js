const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')

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
    const userPassword = await bcrypt.hash(password, 10)

    const newUser = new User({name,email,password:userPassword})

    const registerUser= await newUser.save()

    return res.status(201).json({ message: "User registered successfully", user: {name,email} });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



exports.login = async (req, res) => {

    try{
        const {email,password}=req.body
        if(!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const user= await User.findOne({email}).select("+password")
        if(!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch= await bcrypt.compare(password,user.password)

        if(!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token= jwt.sign({id:user._id, email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"})

        return res.status(200).json({ message: "User logged in successfully", token });
    }
     catch (error) {
    return res.status(500).json({ message: error.message });
  }

}


