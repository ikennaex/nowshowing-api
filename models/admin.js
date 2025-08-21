const mongooose = require("mongoose");
const { Schema } = mongooose;

const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const AdminModel = mongooose.model("Admin", adminSchema);
module.exports = AdminModel;
