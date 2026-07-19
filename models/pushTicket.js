const mongoose = require("mongoose");
const { Schema } = mongoose;

const pushTicketSchema = new Schema({
  ticketId: { type: String, required: true },
  token: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now, expires: 86400 }, // TTL: auto-delete after 24h
});

const PushTicket =
  mongoose.models.PushTicket ||
  mongoose.model("PushTicket", pushTicketSchema);

module.exports = PushTicket;
