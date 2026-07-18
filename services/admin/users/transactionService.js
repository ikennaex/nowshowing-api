const transactionModel = require("../../../models/transactions");

const getTransactions = async (userId) => {
  return await transactionModel
    .find({
      user: userId,
    })

    .sort({
      createdAt: -1,
    });
};

module.exports = {
  getTransactions,
};
