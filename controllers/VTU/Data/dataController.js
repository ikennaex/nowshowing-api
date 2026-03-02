const { default: axios } = require("axios");
const peyflexClient = require("../Services/peyFlexClient");

const getDataNetworks = async (req, res) => {
    try {
        const response = await peyflexClient.get("/api/data/networks/");
        res.status(200).json(response.data);
    } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching available data plans." });
    }
}

const getDataPlans = async (req, res) => {
    try {
        const { network } = req.body;
        const response = await peyflexClient.get(`/api/data/plans/?network=${network}`);
        res.status(200).json(response.data);
    } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching available data plans." });
    }
}

const buyData = async (req, res) => { 
    try {
        const { mobile_number, network, plan_code } = req.body;

        // Validate input
        if (!mobile_number || !network || !plan_code) {  
          return res
            .status(400)
            .json({ error: "Mobile number, amount, and plan code are required." });
        }

        const response = await peyflexClient.post("/api/data/purchase/", req.body);
        res.status(200).json(response.data);
    } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "An error occurred while purchasing data." });
    }
}

module.exports = { getDataNetworks, buyData, getDataPlans };