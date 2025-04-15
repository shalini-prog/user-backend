const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const generateTokenAndSetCookie = require("../utils/generateToken.js");

// REGISTER
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: `User registered with username ${username}` });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Something went wrong during registration" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateTokenAndSetCookie(user, res);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong during login" });
  }
};

// ✅ LOGOUT (Define before exporting!)
const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-page", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Something went wrong during logout" });
  }
};

module.exports = {
  register,
  login,
  logout, // this now works because it's defined above
};
