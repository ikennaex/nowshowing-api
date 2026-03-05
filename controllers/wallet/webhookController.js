const { processPaystackEvent } = require("../../services/wallet/paystackEvents");

const handlePaystackWebhook = (req, res) => {
  try {
    processPaystackEvent(req, res);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = { handlePaystackWebhook };