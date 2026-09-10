const User = require("../model/userModel");

exports.getMe=async(req,res)=>{
  try{
    const id = req.user.id 
    const me = await User.findById(id)
    if (!me) {
      return res.status(404).json({ message: "data dose not found" });
    }
    res.status(200).json(me);
  
  }
  catch(error){    
    return res.status(500).json({ message: error.message });
  }
}