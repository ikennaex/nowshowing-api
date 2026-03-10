const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const verifyPasscode = async (req, res, next) => {
  const userId = req.user._id;
  const { passcode } = req.body;

  try {
    if (!passcode) {
      return res.status(400).json({
        message: "Passcode required",
      });
    }

    const userDoc = await userModel.findById(userId).select("+transactionPin");
    const isMatch = await bcrypt.compare(passcode, userDoc.transactionPin);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid passcode",
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      message: "Passcode verification failed",
    });
  }
};

module.exports = verifyPasscode;
