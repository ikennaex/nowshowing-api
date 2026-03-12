const express = require("express");
const { authToken } = require("../../middleware/auth");
const {
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../../controllers/auth/resetPasswordController");
const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
