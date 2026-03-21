const groupServicesByType = (services, type) => {

  const grouped = {
    instagram: [],
    tiktok: [],
    facebook: []
  };

  services.forEach(service => {

    const name = service.name.toLowerCase();

    if (!name.includes(type)) return;

    if (name.includes("instagram")) {
      grouped.instagram.push(service);
    }

    if (name.includes("tiktok")) {
      grouped.tiktok.push(service);
    }

    if (name.includes("facebook")) {
      grouped.facebook.push(service);
    }

  });

  return grouped;

};

module.exports = groupServicesByType;