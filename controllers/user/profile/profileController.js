const userModel = require("../../../models/user");

const getUserProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const userDoc = await userModel.findOne({ _id: userId });

    if (!userDoc) {
      return res.status(400).json("User not found");
    }

    res.status(200).json(userDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting user details" });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName, phoneNumber } = req.body;

  try {
    if (!firstName && !lastName && !phoneNumber) {
      return res
        .status(400)
        .json({ message: "At least one field must be provided" });
    }

    // Build object with only the fields to update
    const updates = {};
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (phoneNumber) updates.phoneNumber = phoneNumber;

    // Update the user
    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true },
      )
      .select("-hashPass -otp -resetCode -resetCodeExpires"); // hide sensitive fields

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating profile" });
  }
};

module.exports = { getUserProfile, updateProfile };
