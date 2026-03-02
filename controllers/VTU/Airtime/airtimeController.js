const { default: axios } = require("axios");
const { vtuBaseUrl } = require("../vtuBaseUrl");
const peyflexClient = require("../Services/peyFlexClient");

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
}

const buyAirtime = async (req, res) => {
  try {
    const { mobile_number, amount, network } = req.body;

    // Validate input
    if (!mobile_number || !amount || !network) {  
      return res
        .status(400)
        .json({ error: "Mobile number, amount, and network are required." });
    }

    const response = await peyflexClient.post("/api/airtime/topup/", req.body);
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

module.exports = { getAvailableNetworks, buyAirtime };
