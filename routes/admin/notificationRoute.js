const express = require("express");
const { verifyAdmin } = require("../../middleware/auth");
const { sendPromotion } = require("../../controllers/admin/notificationController");

const router = express.Router();

router.post("/notifications/send-promotion", verifyAdmin, sendPromotion);

module.exports = router;
