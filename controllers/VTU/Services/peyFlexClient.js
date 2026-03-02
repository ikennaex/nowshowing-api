const axios = require("axios");
const { vtuBaseUrl } = require("../vtuBaseUrl");

const peyflexClient = axios.create({
  baseURL: `${vtuBaseUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// this attach token to every request
peyflexClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Token ${process.env.PEYFLEX_TOKEN}`;
  return config;
});

module.exports = peyflexClient;