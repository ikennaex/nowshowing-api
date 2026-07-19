const UserModel = require("../models/user");

const saveExpoToken = async (req, res) => {
    try {
        const { pushToken } = req.body;
        const userId = req.user.id;

        if (!pushToken) {
            return res.status(400).json({ error: "Push token is required" });
        }

        await UserModel.findByIdAndUpdate(userId, {
            $addToSet: { expoTokens: pushToken },
        });

        return res.status(200).json({ message: "Push token saved successfully" });
    } catch (err) {
        console.error("Error saving Push token:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { saveExpoToken };