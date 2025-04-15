const jwt = require("jsonwebtoken")


const generateTokenAndSetCookie = (user,res) => {
    const token = jwt.sign(
        { id:user._id,role:user.role },
         process.env.JWT_SECRET,
          { expiresIn: "1h" }
    );

    res.cookie("jwt-page", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });

    return token;
};

module.exports = generateTokenAndSetCookie;