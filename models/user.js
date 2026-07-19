const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hashPass: {
      select: false,
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    transactionPin: {
      type: String,
      select: false,
    },
    pinExists: {
      type: Boolean,
      required: true,
      default: false,
    },
    status : {
      type: String,
      default: "active",
      enum: ["active", "suspended"],},
    otp: {
      type: String,
      select: false,
    },
    resetCodeExpires: {
      type: Date,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    expoTokens: {
      type: [String],
      default: [],
    },
    notificationsEnabled: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true },
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = userModel;
