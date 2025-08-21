const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin");
require('dotenv').config();

const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.adminToken; // read from cookie

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await AdminModel.findById(decoded.id);
    if (!admin) return res.status(401).json({ message: "Admin not found" });

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyAdmin;
