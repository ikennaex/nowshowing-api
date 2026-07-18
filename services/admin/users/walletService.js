const walletModel = require("../../../models/wallet");

const creditWallet = async (userId, amount) => {
  const wallet = await walletModel.findOne({ user: userId });

  wallet.balance += Number(amount);

  await wallet.save();

  return wallet;
};

const debitWallet = async (userId, amount) => {
  const wallet = await walletModel.findOne({ user: userId });

  wallet.balance -= Number(amount);

  await wallet.save();

  return wallet;
};

const freezeWallet = async (userId) => {
  return await walletModel.findOneAndUpdate(
    {
      user: userId,
    },

    {
      isFrozen: true,
    },

    {
      new: true,
    },
  );
};

const unfreezeWallet = async (userId) => {
  return await walletModel.findOneAndUpdate(
    {
      user: userId,
    },

    {
      isFrozen: true,
    },

    {
      new: true,
    },
  );
};

module.exports = {
  creditWallet,

  debitWallet,

  freezeWallet,
  unfreezeWallet,
};
