const walletModel = require("../../../models/wallet");

const getTotalWalletBalance = async () => {
    const result = await walletModel.aggregate([
        {
            $group: {
                _id: null,
                totalBalance: { $sum: "$balance" }
            }
        }
    ]);

    return result[0]?.totalBalance || 0;
};

module.exports = {
    getTotalWalletBalance
};