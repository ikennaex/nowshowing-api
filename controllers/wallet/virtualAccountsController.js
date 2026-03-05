const genVirtualAccount = require("../../services/wallet/genVirtualAccount");

const createVirtualAccount = async (req, res) => {
  const { user } = req.body;
  try {
    const account = await genVirtualAccount(user);

    res.status(200).json({ account });
  } catch (err) {
    res.status(500).json({
      message: "Account creation failed",
    });
  }
};

module.exports = {createVirtualAccount}