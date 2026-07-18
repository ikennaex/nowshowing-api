const userModel = require("../../../models/user");

const getTotalUsers = async () => {
    return await userModel.countDocuments();
};

const getActiveUsers = async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return await userModel.countDocuments({
        updatedAt: { $gte: thirtyDaysAgo }
    });
};

const getRecentUsers = async () => {
    return await userModel
        .find()
        .sort({ createdAt: -1 })
        .limit(10)
        .select("firstName lastName email createdAt");
};

module.exports = {
    getTotalUsers,
    getActiveUsers,
    getRecentUsers
};