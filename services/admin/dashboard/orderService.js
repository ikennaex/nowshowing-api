const transactionModel = require("../../../models/transactions");

const getPendingOrders = async () => {

    return await transactionModel.countDocuments({
        status:"PENDING"
    });

};

const getSuccessfulOrders = async () => {

    return await transactionModel.countDocuments({
        status:"SUCCESS"
    });

};

const getFailedOrders = async () => {

    return await transactionModel.countDocuments({
        status:"FAILED"
    });

};

module.exports = {
    getPendingOrders,
    getSuccessfulOrders,
    getFailedOrders
};