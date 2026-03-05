const mongoose = require("mongoose");
const { Schema } = mongoose;

const virtualAccountSchema = new Schema({
  userEmail: { type: String, required: true },
  accountNumber: { type: String, required: true },
  bank: { type: String, required: true },
  currency: { type: String, required: true },
  status: { type: String, enum: ["active", "failed"], default: "active" },
  paystackId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const virtualAccountModel = mongoose.model("VirtualAccounts", virtualAccountSchema);
module.exports = virtualAccountModel;
