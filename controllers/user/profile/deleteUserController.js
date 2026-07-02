const userModel = require("../../../models/user");

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isDeleted = true;
    user.deletedAt = new Date();

    await user.save();

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const requestDeleteAccountWeb = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email });


    if (!user) {
      return res.status(200).json({
        message:
          "If an account exists with this email, your deletion request has been received.",
      });
    }

    user.deleteRequest = {
      requested: true,
      requestedAt: new Date(),
    };

    await user.save();

    return res.status(200).json({
      message:
        "Your deletion request has been received. We will process it within 30 days.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {deleteAccount, requestDeleteAccountWeb};