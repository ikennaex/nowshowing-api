const walletModel = require("../../models/wallet");
const debitWallet = require("../../services/wallet/debitWallet");
const notifyAdminSmm = require("../../utils/emails/notifyAdminSmm");
const applyMarkup = require("../../utils/smm/applyMarkup");
const getAllServices = require("../../utils/smm/getAllServices");
const groupServicesByType = require("../../utils/smm/groupServicesByType");

const getLikesServices = async (req, res) => {
  try {
    const services = await getAllServices();

    const groupedLikes = groupServicesByType(services, "likes");

    groupedLikes.instagram = applyMarkup(groupedLikes.instagram, "likes");
    groupedLikes.tiktok = applyMarkup(groupedLikes.tiktok, "likes");
    groupedLikes.facebook = applyMarkup(groupedLikes.facebook, "likes");
    groupedLikes.youtube = applyMarkup(groupedLikes.youtube, "likes"); 

    res.json(groupedLikes);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch like services", 
    });
  }
};

const buyLikes = async (req, res) => {
  const userId = req.user._id;
  const {
    service,
    name,
    quantity,
    amount,
    category,
    refill,
    average_time,
    link,
  } = req.body;
  if (
    !service ||
    !name ||
    !category ||
    refill === undefined ||
    !average_time ||
    !link ||
    quantity === undefined ||
    amount === undefined
  ) {
    return res.status(400).json({
      error:
        "service, name, quantity, amount, category, refill, average_time, link are required.",
    });
  }
  try {
    // check wallet balance
    const wallet = await walletModel.findOne({ user: userId });
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // gen reference
    const reference = "smmlikes_" + Date.now();
    const debitResponse = await debitWallet(userId, amount, reference, {
      service: "smmlikes",
    });

    await notifyAdminSmm({
      service,
      name,
      quantity,
      amount,
      category,
      refill,
      average_time,
      link,
      serviceName: "Likes",
    });

    console.log(debitResponse);

    res.status(200).json({
      message: `Request has been proceesed succussfully, should be fulfilled in ${average_time}`,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

const getFollowersServices = async (req, res) => {
  try {
    const services = await getAllServices();

    const groupedFollowers = groupServicesByType(services, "followers");

    groupedFollowers.instagram = applyMarkup(groupedFollowers.instagram, "followers");
    groupedFollowers.tiktok = applyMarkup(groupedFollowers.tiktok, "followers");
    groupedFollowers.facebook = applyMarkup(groupedFollowers.facebook, "followers");

    res.json(groupedFollowers);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch follower services",
    });
  }
};

const buyFollowers = async (req, res) => {
  const userId = req.user._id;
  const {
    service,
    name,
    quantity,
    amount,
    category,
    refill,
    average_time,
    link,
  } = req.body;
  if (
    !service ||
    !name ||
    !category ||
    refill === undefined ||
    !average_time ||
    !link ||
    quantity === undefined ||
    amount === undefined
  ) {
    return res.status(400).json({
      error:
        "service, name, quantity, amount, category, refill, average_time, link are required.",
    });
  }
  try {
    // check wallet balance
    const wallet = await walletModel.findOne({ user: userId });
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // gen reference
    const reference = "smmlikes_" + Date.now();
    const debitResponse = await debitWallet(userId, amount, reference, {
      service: "smmlikes",
    });

    await notifyAdminSmm({
      service,
      name,
      quantity,
      amount,
      category,
      refill,
      average_time,
      link,
      serviceName: "Followers",
    });

    console.log(debitResponse);

    res.status(200).json({
      message: `Request has been proceesed succussfully, should be fulfilled in ${average_time}`,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

module.exports = {
  getLikesServices,
  getFollowersServices,
  buyLikes,
  buyFollowers,
};
