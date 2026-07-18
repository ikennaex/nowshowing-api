const userModel = require("../../../models/user");

const getUsers = async (page, limit) => {
    return await userModel.aggregate([
        {
            $lookup: {
                from: "wallets",
                localField: "_id",
                foreignField: "user",
                as: "wallet"
            }
        },
        {
            $unwind: {
                path: "$wallet",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
                phoneNumber: 1,
                status: 1,
                createdAt: 1,
                walletBalance: {
                    $ifNull: ["$wallet.balance", 0]
                },
                walletFrozen: {
                    $ifNull: ["$wallet.isFrozen", false]
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: limit
        }
    ]);
};

const getUserById = async (id) => {
  return await userModel.findById(id);
}

const searchUsers = async (keyword) => {
  return await userModel.find({
    $or: [
      { FirstName: { $regex: keyword, $options: "i" } },
      { LastName: { $regex: keyword, $options: "i" } },

      { email: { $regex: keyword, $options: "i" } },

      { phone: { $regex: keyword, $options: "i" } },
    ],
  });
};

const updateUser = async (id, data) => {
  return await userModel.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const suspendUser = async (id) => {
  return await userModel.findByIdAndUpdate(
    id,

    {
      status: "suspended",
    },

    {
      new: true,
    },
  );
};

const activateUser = async (id) => {
  return await userModel.findByIdAndUpdate(
    id,

    {
      status: "active",
    },

    {
      new: true,
    },
  );
};

const verifyUser = async (id) => {
  return await userModel.findByIdAndUpdate(
    id,

    {
      verified: true,
    },

    {
      new: true,
    },
  );
};

module.exports = {
  getUsers,

  getUserById,

  searchUsers,

  updateUser,

  suspendUser,

  activateUser,

  verifyUser,
};
