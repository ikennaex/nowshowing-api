const advertModel = require("../models/advert");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const postAdvert = async (req, res) => {
  const { title, link } = req.body;

  if (!title || !link) {
    return res.status(400).json({ message: "Title and link are required" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "advert", resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);

          // check video duration (in seconds)
          if (result.resource_type === "video" && result.duration > 30) {
            // delete it if too long
            cloudinary.uploader.destroy(result.public_id, {
              resource_type: "video",
            });
            return reject(
              new Error("Video too long. Max allowed is 30 seconds.")
            );
          } else resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const response = await advertModel.create({
      title,
      link,
      media: result.secure_url,
    });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAdvert = async (req, res) => {
  try {
    const response = await advertModel.find();
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAdvertById = async (req, res) => {
  const { id } = req.params;

  try {
    const advert = await advertModel.findById(id);
    if (!advert) return res.status(404).json({ message: "Advert not found" });

    res.status(200).json(advert);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const editAdvert = async (req, res) => {
  const { id } = req.params;
  const { title, media, link, active } = req.body;

  try {
    const advertDetailsById = await advertModel.findById(id);

    if (!advertDetailsById) {
      return res.status(404).json({ message: "Advert not found" });
    }

    const updatedAdvert = await advertModel.findByIdAndUpdate(
      id,
      { title, media, link, active },
      { new: true }
    );

    res.status(200).json(updatedAdvert);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAdvert = async (req, res) => {
  const { id } = req.params;

  try {
    const advertDetailsById = await advertModel.findById(id);

    if (!advertDetailsById) {
      return res.status(404).json({ message: "Advert not found" });
    }

    await advertModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Advert deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  postAdvert,
  getAdvert,
  getAdvertById,
  editAdvert,
  deleteAdvert,
};
