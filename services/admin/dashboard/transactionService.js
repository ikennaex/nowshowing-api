const transactionModel = require("../../../models/transactions");

const getTotalRevenue = async () => {
  const result = await transactionModel.aggregate([
    {
      $match: {
        status: "success",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  return result[0]?.total || 0;
};

const getTodayRevenue = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const result = await transactionModel.aggregate([
    {
      $match: {
        status: "success",
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  return result[0]?.total || 0;
};

const getRecentTransactions = async () => {
  return await transactionModel
    .find()

    .populate("user", "fullname email")

    .sort({
      createdAt: -1,
    })

    .limit(10);
};

module.exports = {
  getTotalRevenue,
  getTodayRevenue,
  getRecentTransactions,
};
