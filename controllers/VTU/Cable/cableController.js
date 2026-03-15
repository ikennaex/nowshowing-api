const walletModel = require("../../../models/wallet");
const debitWallet = require("../../../services/wallet/debitWallet");
const peyflexClient = require("../Services/peyFlexClient");

const getCableProviders = async (req, res) => {
  try {
    const response = await peyflexClient.get("/api/cable/providers/");
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while fetching available cable providers.",
    });
  }
};

const getCablePlans = async (req, res) => {
  try {
    const { identifier } = req.body;
    const response = await peyflexClient.get(`/api/cable/plans/${identifier}/`);
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while fetching available cable providers.",
    });
  }
};

const verifyIuc = async (req, res) => {
  try {
    const { iuc, identifier } = req.body;
    const response = await peyflexClient.post(`/api/cable/verify/`, {
      iuc,
      identifier,
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while verifying IUC." });
  }
};

const buyCableSubscription = async (req, res) => {
  try {
    const userId = req.user._id;
    const { iuc, identifier, plan, phone, amount } = req.body;

    // Validate input
    if (!iuc || !identifier || !plan || !phone || !amount) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    // check wallet amount
    const wallet = await walletModel.findOne({ user: userId });
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // call provider api
    const response = await peyflexClient.post(
      "/api/cable/subscribe/",
      req.body,
    );

    const providerResponse = response.data;
    if (providerResponse.status !== "SUCCESS") {
      return res.status(400).json({
        message: "Cable purchase failed",
        provider: providerResponse,
      });
    }

    // debit wallet
    const reference = "cable" + Date.now();
    await debitWallet(userId, amount, reference, { service: "cable", providerResponse });

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while subscribing to cable." });
  }
};

module.exports = {
  getCableProviders,
  getCablePlans,
  verifyIuc,
  buyCableSubscription,
};
