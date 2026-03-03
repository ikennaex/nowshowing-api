const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["credit", "debit"], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  description: String, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const transactionModel = mongoose.model("Transaction", transactionSchema);
module.exports = transactionModel;
