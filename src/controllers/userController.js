
const admin = async(req,res)=>{
    
    try{
        res.status(200).json({message:`Welcome
            ${req.user.role}`
        })
    }catch(err){
        res.status(500).json({message:"server error:internal error"})
    }
}

const manager = async(req,res)=>{
    try{
        res.status(200).json({message:`Welcome
            ${req.user.role}`
        })
    }catch(err){
        res.status(500).json({message:"server error:internal error"})
    }
}

const user = async(req,res)=>{
    try{
        res.status(200).json({message:`Welcome
            ${req.user.role}`
        })
    }catch(err){
        res.status(500).json({message:"server error:internal error"})
    }
}

module.exports = {admin,manager,user}