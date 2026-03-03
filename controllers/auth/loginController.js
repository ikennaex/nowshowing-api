const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    const userDoc = await userModel
      .findOne({ email: normalizedEmail })
      .select("+hashPass");
    if (!userDoc) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, userDoc.hashPass);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const refreshToken = jwt.sign(
      { id: userDoc._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" },
    );

    const { hashPass, ...user } = userDoc.toObject();

    userDoc.refreshToken = refreshToken;
    await userDoc.save();

    res
      .status(200)
      .json({
        message: "Login successful",
        accessToken,
        refreshToken,
        user,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login Failed" });
  }
};

module.exports = {
  handleLogin,
};
