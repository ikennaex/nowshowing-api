const express = require("express");
const {
  handleLogin,
  handleLogout,
} = require("../../controllers/auth/loginController");
const { refreshTokenHandler } = require("../../controllers/auth/refreshTokenController");
const router = express.Router();

router.post("/login", handleLogin);
router.post("/refresh", refreshTokenHandler);
router.post("/logout", handleLogout);

module.exports = router;
