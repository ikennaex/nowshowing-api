const { default: axios } = require("axios");
const { owletBaseUrl } = require("./smmBaseUrl");


const owletApi = axios.create({
  baseURL: `${owletBaseUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

owletApi.interceptors.request.use((config) => {
  config.data = {
    ...config.data,
    key: process.env.OWLET_API_KEY,
  };

  return config;
});

module.exports = owletApi;
