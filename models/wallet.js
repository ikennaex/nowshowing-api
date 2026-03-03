const mongoose = require("mongoose");
const { Schema } = mongoose;

const walletSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  balance: { type: Number, default: 0 },
});

const walletModel = mongoose.model("Wallet", walletSchema);
module.exports = walletModel;
