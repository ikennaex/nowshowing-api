const userService = require('../../services/admin/users/userService');
const walletService = require('../../services/admin/users/walletService');
const transactionService = require('../../services/admin/users/transactionService');
const debitWallet = require('../../services/wallet/debitWallet');
const creditWallet = require('../../services/wallet/creditWallet');


const getUsers = async (req, res) => {
    try {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 20);

        const users = await userService.getUsers(page, limit);

        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try{
        const user = await userService.getUserById(req.params.id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const searchUsers = async (req, res) => {
    try {
        const users = await userService.searchUsers(req.query.search);

        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const suspendUser = async (req, res) => {
    try {
        const user = await userService.suspendUser(req.params.id);

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const activateUser = async (req, res) => {
    try {
        const user = await userService.activateUser(req.params.id);

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const verifyUser = async (req, res) => {
    try {
        const user = await userService.verifyUser(req.params.id);

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const creditUserWallet = async (req, res) => {
    try {
        const { amount, reason } = req.body;

        const wallet = await creditWallet({
            userId: req.params.id,
            amount: Number(amount),
            reference: `adm-${Date.now()}`,
            source: "ADMIN",
            meta: {
                adminId: req.admin._id,
                reason
            }
        });
        console.log("Wallet credited successfully:", wallet);
        return res.status(200).json({
            success: true,
            message: "Wallet credited successfully",
            data: wallet
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const debitUserWallet = async (req, res) => {
    try {
        const { amount, reason } = req.body;

        const result = await debitWallet(
            req.params.id,
            Number(amount),
            `adm-${Date.now()}`, 
            {
                source: "ADMIN",
                admin: req.admin._id,
                reason
            }
        );

        return res.status(200).json({
            success: true,
            message: "Wallet debited successfully",
            data: result
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

const freezeWallet = async (req, res) => {
    try {
        const wallet = await walletService.freezeWallet(req.params.id);

        return res.status(200).json({
            success: true,
            data: wallet
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const unfreezeWallet = async (req, res) => {
    try {
        const wallet = await walletService.unfreezeWallet(req.params.id);

        return res.status(200).json({
            success: true,
            data: wallet
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getUserTransactions = async (req, res) => {
    try {
        const transactions =
            await transactionService.getTransactions(req.params.id);

        return res.status(200).json({
            success: true,
            data: transactions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getUsers,
    getUserById,
    searchUsers,
    updateUser,
    suspendUser,
    activateUser,
    verifyUser,
    creditUserWallet,
    debitUserWallet,
    freezeWallet,
    unfreezeWallet,
    getUserTransactions
};