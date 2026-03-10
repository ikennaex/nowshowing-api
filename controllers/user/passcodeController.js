const userModel = require("../../models/user");
const bcrypt = require("bcrypt");

const setPasscode = async (req, res) => {
  const userId = req.user._id;
  const { passcode } = req.body;
  try {
    if (!passcode) {
      return res.status(400).json({
        message: "Passcode is required",
      });
    }

    if (!/^\d{4}$/.test(passcode)) {
      return res.status(400).json({
        message: "Passcode must be a 4 digit number",
      });
    }

    const userDoc = await userModel
      .findById({ _id: userId })
      .select("+transactionPin");

    if (!userDoc) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (userDoc.transactionPin) {
      return res.status(400).json({ message: "User already has a passcode" });
    }

    const hashedPin = await bcrypt.hash(passcode, 10);
    userDoc.transactionPin = hashedPin;
    await userDoc.save();

    return res.status(200).json({
      message: "Passcode set successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to set passcode",
    });
  }
};

module.exports = { setPasscode };
