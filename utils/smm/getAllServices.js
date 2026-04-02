const { default: axios } = require("axios");
const sociallyApi = require("../../services/smm/sociallyApi");
const owletApi = require("../../services/smm/owletApi");

const getSmmServices = async (req, res) => {
  try {
    const allServices = await owletApi.post("", { action: "services" });
    return (allServices.data);
  } catch (err) {
    console.error(err);
    return err
  }
};

module.exports = getSmmServices;
