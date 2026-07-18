const mongoose = require("mongoose");
const walletModel = require("../../models/wallet");
const transactionModel = require("../../models/transactions");

const creditWallet = async ({
  userId,
  amount,
  reference,
  meta = {},
  source = "SYSTEM",
}) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existing = await transactionModel
      .findOne({
        reference,
      })
      .session(session);

    if (existing) {
      throw new Error("Duplicate transaction");
    }

    const wallet = await walletModel.findOneAndUpdate(
      {
        user: userId,
        isFrozen: false,
      },
      {
        $inc: {
          balance: amount,
        },
      },
      {
        new: true,
        session,
        upsert: true,
      },
    );

    await transactionModel.create(
      [
        {
          user: userId,
          type: "credit",
          amount,
          previousBalance: wallet.balance - amount,
          currentBalance: wallet.balance,
          reference,
          status: "success",
          meta,
          source,
        },
      ],
      { session },
    );

    await session.commitTransaction();

    return wallet;
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    session.endSession();
  }
};

module.exports = creditWallet;
