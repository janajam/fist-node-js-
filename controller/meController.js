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


exports.updateMe=async(req,res)=>{
    try{
        const {name,email}=req.body 
        const id =req.user.id
        const me=await User.findById(id)
        if(!me){
            return res.status(404).json({message:'data dose not found'})
        }
        const updatedMe=await User.findByIdAndUpdate(id,{name,email},{
            new:true
        })
        return res.status(200).json({message:'data updated successfully',users:updatedMe})
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}
