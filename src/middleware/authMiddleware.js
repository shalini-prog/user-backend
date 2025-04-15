const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next) =>{
    
    const token = req.cookies["jwt-page"];
    if (!token) {
        return res.status(401).json({message: "Unauthorized - No Token Provided" });
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        if (!decode) {
			return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
		}

        req.user = decode;
        console.log("The decoded user is:",req.user);
        next()
    }catch(err){
        res.status(400).json({message:"Token is not valid"});
    }
}

module.exports = verifyToken