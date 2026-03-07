const mongoose = require("mongoose");
const walletModel = require("../../models/wallet");
const transactionModel = require("../../models/transactions");

const debitWallet = async (userId, amount, reference, meta = {}) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existing = await transactionModel.findOne({ reference });

    if (existing) {
      throw new Error("Duplicate transaction");
    }
    const wallet = await walletModel.findOne({ user: userId }).session(session);

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    if (wallet.balance < amount) {
      throw new Error("Insufficient Balance");
    }

    wallet.balance = wallet.balance - amount;

    await wallet.save({ session });
    await transactionModel.create(
      [
        {
          user: userId,
          type: "debit",
          amount,
          reference,
          status: "success",
          meta,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return { success: true };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    throw err;
  }
};

module.exports = debitWallet;
