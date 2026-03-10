const express = require("express");
const {
  handleLogin,
  handleLogout,
} = require("../../controllers/auth/loginController");
const router = express.Router();

router.route("/login").post(handleLogin);

router.route("/logout").post(handleLogout);

module.exports = router;
