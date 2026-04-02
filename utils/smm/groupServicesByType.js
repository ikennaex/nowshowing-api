const groupServicesByType = (services, types) => {

  const grouped = {
    instagram: [],
    tiktok: [],
    facebook: [],
    youtube: [],
    twitter: []
  };

  // types is always an array 
  const typeArray = Array.isArray(types) ? types : [types];

  services.forEach(service => {

    const name = service.name.toLowerCase();

    const match = typeArray.some(type => name.includes(type));

    if (!match) return;

    if (name.includes("instagram")) {
      grouped.instagram.push(service);
    }

    if (name.includes("tiktok")) {
      grouped.tiktok.push(service);
    }

    if (name.includes("facebook")) {
      grouped.facebook.push(service);
    }

    if (name.includes("youtube")) {
      grouped.youtube.push(service);
    }

    if (name.includes("twitter")) {
      grouped.twitter.push(service);
    }

  });

  return grouped;

};

module.exports = groupServicesByType;