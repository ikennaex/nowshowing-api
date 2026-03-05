const mongoose = require("mongoose");
const { Schema } = mongoose;

const virtualAccountSchema = new Schema({
  customer: { type: Object, required: true },
  dedicatedAccount: { type: Object, required: true },

});

const virtualAccountModel = mongoose.model("VirtualAccounts", virtualAccountSchema);
module.exports = virtualAccountModel;
