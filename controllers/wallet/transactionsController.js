const transactionModel = require("../../models/transactions")

const getTransactions = async (req, res) => {
    const user = req.user._id

    try { 
        const transactions = await transactionModel.find({user})
        if (!transactions) {
            return res.status(404).json({message: "No transactions found"})
        }
        res.status(200).json(transactions)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "Error getting user transactions"})
    }
}

module.exports = {getTransactions}