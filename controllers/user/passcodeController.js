const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const resetPasscodeMail = require("../../utils/emails/resetPasscodeMail");
const crypto = require("crypto");
const resetPasscodeSuccessMail = require("../../utils/emails/resetPasscodeSuccessMail");

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
    userDoc.pinExists = true;
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

const forgotPasscode = async (req, res) => {
  const userId = req.user._id;
  try {
    const userDoc = await userModel.findOne({ _id: userId });

    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    const email = userDoc.email;

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const hashedCode = crypto.createHash("sha256").update(otp).digest("hex");

    userDoc.otp = hashedCode;
    userDoc.resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000);

    await userDoc.save();

    await resetPasscodeMail({ email, otp });

    res
      .status(200)
      .json({ message: "PIN reset instructions sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error resetting your PIN" });
  }
};

const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const userId = req.user._id;
  try {
    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    const userDoc = await userModel
      .findOne({ _id: userId })
      .select("+otp +resetCodeExpires");

    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedCode = crypto.createHash("sha256").update(otp).digest("hex");

    if (userDoc.otp !== hashedCode || userDoc.resetCodeExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error verifying OTP" });
  }
};

const resetPasscode = async (req, res) => {
  const userId = req.user._id;
  const { otp, passcode } = req.body;

  try {
    if (!otp || !passcode) {
      return res.status(400).json({
        message: "OTP and PIN are required",
      });
    }

    if (!/^\d{4}$/.test(passcode)) {
      return res.status(400).json({
        message: "PIN must be a 4 digit number",
      });
    }

    const userDoc = await userModel
      .findById(userId)
      .select("+otp +resetCodeExpires +transactionPin");

    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedCode = crypto.createHash("sha256").update(otp).digest("hex");

    if (userDoc.otp !== hashedCode || userDoc.resetCodeExpires < Date.now()) {
      return res.status(400).json({
        message: "Invalid or expired code",
      });
    }

    userDoc.transactionPin = await bcrypt.hash(passcode, 10);

    userDoc.otp = undefined;
    userDoc.resetCodeExpires = undefined;

    await userDoc.save();

    await resetPasscodeSuccessMail({
      email: userDoc.email,
    });

    return res.status(200).json({
      message: "PIN reset successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Error resetting PIN",
    });
  }
};
module.exports = { setPasscode, forgotPasscode, resetPasscode, verifyOtp };
