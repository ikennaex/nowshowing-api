const { default: axios } = require("axios");
const { smmBaseUrl } = require("./smmBaseUrl");


const sociallyApi = axios.create({
  baseURL: `${smmBaseUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

sociallyApi.interceptors.request.use((config) => {
  config.data = {
    ...config.data,
    key: process.env.SMM_API_KEY,
  };

  return config;
});

module.exports = sociallyApi;
