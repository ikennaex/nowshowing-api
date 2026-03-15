const { default: axios } = require("axios");
const peyflexClient = require("../Services/peyFlexClient");
const debitWallet = require("../../../services/wallet/debitWallet");
const walletModel = require("../../../models/wallet");

const getDataNetworks = async (req, res) => {
  try {
    const response = await peyflexClient.get("/api/data/networks/");
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while fetching available data plans.",
    });
  }
};

const getDataPlans = async (req, res) => {
  try {
    const { network } = req.body;
    const response = await peyflexClient.get(
      `/api/data/plans/?network=${network}`,
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while fetching available data plans.",
    });
  }
};

const buyData = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mobile_number, network, plan_code } = req.body;

    // Validate input
    if (!mobile_number || !network || !plan_code) {
      return res
        .status(400)
        .json({ error: "Mobile number, amount, and plan code are required." });
    }

    // to get the amount for the data
    const networkPlans = await peyflexClient.get(
      `api/data/plans/?network=${network}`,
    );
    const planObj = networkPlans.data.plans.find(
      (plan) => plan.plan_code === plan_code,
    );
    const amount = planObj?.amount;

    if (!amount) {
      return res.status(400).json({ error: "Invalid plan code" });
    }

    // check wallet balance 
    const wallet = await walletModel.findOne({ user: userId });
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // call provider api 
    const response = await peyflexClient.post("/api/data/purchase/", req.body);
    const providerData = response.data;

    if (providerData.status !== "SUCCESS") {
      return res.status(400).json({
        message: "Data purchase failed",
        provider: providerData,
      });
    }

    // debit wallet 
    const reference = "data_" + Date.now();
    await debitWallet(userId, amount, reference, { service: "data", providerResponse:providerData });

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while purchasing data." });
  }
};

module.exports = { getDataNetworks, buyData, getDataPlans };
