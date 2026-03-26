const markup = require("../../config/markupConfig");

const applyMarkup = (services, type) => {

  return services.map(service => {

    const name = service.name.toLowerCase();

    let platform = null;

    if (name.includes("instagram")) {
      platform = "instagram";
    }

    if (name.includes("tiktok")) {
      platform = "tiktok";
    }

    if (name.includes("facebook")) {
      platform = "facebook";
    }

    if (name.includes("youtube")) {
      platform = "youtube";
    }

    if (!platform) return service;

    const multiplier = markup[type]?.[platform] || 1;

    const newRate = (parseFloat(service.rate) * multiplier).toFixed(2);

    return {
      ...service,
      originalRate: service.rate,
      rate: newRate
    };

  });

};

module.exports = applyMarkup;