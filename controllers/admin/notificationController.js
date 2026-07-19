const UserModel = require("../../models/user");
const {
  sendBulkPushNotificationsAsync,
} = require("../../services/notificationService");

const sendPromotion = async (req, res) => {
  try {
    const { title, message, data } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required",
      });
    }

    // Respond immediately — don't block on sending
    res.status(202).json({
      success: true,
      message: "Promotion notification queued for delivery",
    });

    // Fire-and-forget: bulk send runs asynchronously after response
    const users = await UserModel.find({ isDeleted: { $ne: true } }, "_id");
    const userIds = users.map((u) => u._id);

    sendBulkPushNotificationsAsync(
      userIds,
      title,
      message,
      { ...data, screen: "/(tabs)/notifications" },
      "promotion",
      { respectPreferences: true }
    ).catch((err) => console.error("Bulk promotion send error:", err));
  } catch (error) {
    // Only reaches here if the query/validation before res.status(202) fails
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    console.error("Promotion send error:", error);
  }
};

module.exports = { sendPromotion };
