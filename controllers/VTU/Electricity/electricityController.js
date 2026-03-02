const peyflexClient = require("../Services/peyFlexClient");

const getDiscoProviders = async (req, res) => {
  try {
    const response = await peyflexClient.get(
      "/api/electricity/plans/?identifier=electricity",
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error:
        "An error occurred while fetching available electricity providers.",
    });
  }
};

const verifyMeterNumber = async (req, res) => {
  const { meter, plan, type } = req.body;
  try {
    const response = await peyflexClient.get(
      `/api/electricity/verify/?identifier=electricity&meter=${meter}&plan=${plan}&type=${type}`,
      req.body,
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while verifying meter number.",
    });
  }
};

const buyElectricity = async (req, res) => {
  const { identifier, meter, plan, type, phone, amount } = req.body;
  // Validate input

  if (!identifier || !meter || !plan || !type || !phone || !amount) {
    return res.status(400).json({
      error: "All fields are required.",
    });
  }

  try {
    const response = await peyflexClient.post(
      "/api/electricity/purchase/",
      req.body,
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while purchasing electricity.",
    });
  }
};

module.exports = { getDiscoProviders, verifyMeterNumber, buyElectricity };
