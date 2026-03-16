const { default: axios } = require("axios");
const { vtuBaseUrl } = require("../vtuBaseUrl");
const peyflexClient = require("../Services/peyFlexClient");
const debitWallet = require("../../../services/wallet/debitWallet");
const walletModel = require("../../../models/wallet");

const getAvailableNetworks = async (req, res) => {
  try {
    const response = await peyflexClient.get("/api/airtime/networks/");
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching available networks." });
  }
};

const buyAirtime = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mobile_number, amount, network } = req.body;

    // Validate input
    if (!mobile_number || !amount || !network) {
      console.log("Some details are missing")
      return res
        .status(400)
        .json({ error: "Mobile number, amount, and network are required." });

    }

    // check wallet balance
    const wallet = await walletModel.findOne({ user: userId });
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    
    // call peyflex api
    const response = await peyflexClient.post("/api/airtime/topup/", req.body);
    console.log(response.data);
    
    const providerData = response.data;
    
    if (providerData.status !== "SUCCESS") {
      return res.status(400).json({
        message: "Airtime purchase failed",
        provider: providerData,
      });
    }

    
    // debit wallet
    const reference = "airtime_" + Date.now();  
    const debitResponse = await debitWallet(userId, amount, reference, { service: "airtime", providerResponse:providerData });

    console.log(debitResponse)

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

module.exports = { getAvailableNetworks, buyAirtime };
