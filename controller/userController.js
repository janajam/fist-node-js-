const User = require("../model/userModel");

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
   const saveUser= await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: saveUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllUsers=async(req ,res)=>{
    try{
        const users= await User.find();
        if(!users|| users.length===0){ 
            return res.status(404).json({message:"No users found"})
    }
    res.status(200).json(users)
}
    catch(error){
        res.status(500).json({message:error.message})
}
}


exports.getUserById=async(req,res)=>{
  try{
    const userId=req.params.id;
    const user = await User.findById(userId)
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    res.status(200).json(user)
    }
   catch(error){
        res.status(500).json({message:error.message})
}
}