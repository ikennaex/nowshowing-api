const walletModel = require("../../models/wallet")

const getWalletBalance = async (req, res) => { 
    const user = req.user._id
    try {
        const balance = await walletModel.findOne({user})

        if (!balance) {
            return res.status(404).json({message: "Wallet not found"})
        }

        res.status(200).json(balance)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "Error getting user wallet"})
    }
}

module.exports = {getWalletBalance}