const express = require('express')
const { verifyAdmin } = require('../../middleware/auth')
const { getUsers, suspendUser, activateUser, verifyUser, freezeWallet, unfreezeWallet, getUserTransactions, updateUser, debitUserWallet, creditUserWallet, getUserById } = require('../../controllers/admin/userController')
const router = express.Router()

router.get('/users', verifyAdmin, getUsers)
router.get('/user/:id', verifyAdmin, getUserById)
router.put('/user/:id', verifyAdmin, updateUser)
router.patch('/user/:id/suspend', verifyAdmin, suspendUser)
router.patch('/user/:id/activate', verifyAdmin, activateUser)
router.patch('/user/:id/verify', verifyAdmin, verifyUser)
router.post('/user/:id/wallet/credit', verifyAdmin, creditUserWallet)
router.post('/user/:id/wallet/debit', verifyAdmin, debitUserWallet)
router.patch('/user/:id/wallet/freeze', verifyAdmin, freezeWallet)
router.patch('/user/:id/wallet/unfreeze', verifyAdmin, unfreezeWallet)
router.get('/user/:id/transactions', verifyAdmin, getUserTransactions)

module.exports = router