const AdminModel = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const loginAdmin = async (req, res) => {

  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    
    // Set cookie
    res.cookie("adminToken", token, {
      httpOnly: true,  
      secure: true, 
      sameSite: "None",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Error fetching admin profile" });
  }
};

module.exports = { loginAdmin, getAdminProfile };
