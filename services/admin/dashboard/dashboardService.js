const { getPendingOrders, getSuccessfulOrders, getFailedOrders } = require("./orderService");
const { getTotalRevenue, getTodayRevenue, getRecentTransactions } = require("./transactionService");
const { getTotalUsers, getActiveUsers, getRecentUsers } = require("./userService");
const { getTotalWalletBalance } = require("./walletService");


const getDashboard = async () => {

    const [
        totalUsers,
        activeUsers,
        walletBalance,
        totalRevenue,
        todayRevenue,
        pendingOrders,
        successfulOrders,
        failedOrders,
        recentTransactions,
        recentUsers
    ] = await Promise.all([

        getTotalUsers(),
        getActiveUsers(),
        getTotalWalletBalance(),
        getTotalRevenue(),
        getTodayRevenue(),
        getPendingOrders(),
        getSuccessfulOrders(),
        getFailedOrders(),
        getRecentTransactions(),
        getRecentUsers()

    ]);

    return {

        stats: {

            totalUsers,
            activeUsers,
            walletBalance,
            totalRevenue,
            todayRevenue,
            pendingOrders,
            successfulOrders,
            failedOrders

        },

        recentTransactions,

        recentUsers

    };

};

module.exports = {
    getDashboard
};