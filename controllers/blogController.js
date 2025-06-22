const blogModel = require("../models/blog");
const cloudinary = require("../config/cloudinary")
const fs = require("fs");

const streamifier = require("streamifier");

const postBlog = async (req, res) => {
  const { title, content, author } = req.body;

  // Checks if there is a file in the request (posterUrl)
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    // Upload to Cloudinary from memory buffer
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blog" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    // Save to DB
    const response = await blogModel.create({
      title,
      content,
      img: result.secure_url,
      author,
    });

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Server error" });
  }
};


const getBlog = async (req, res) => {
  try {
    const response = await blogModel.find();
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const editBlog = async (req, res) => {
  const { id } = req.params;
  const {
    title, content, author
  } = req.body;

  let updatedFields = {title, content, author};

  try {
    // try to find cinemamovie
    const blogDetailsbyId = await blogModel.findById(id);

    if (!blogDetailsbyId) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // updated product
    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );
    res.status(200).json(updatedBlog); // return the updates blog detail
  } catch (err) {
    console.error(err);
    res.status(500).json("server error ");
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await blogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  postBlog,
  getBlog,
  getBlogById,
  editBlog,
  deleteBlog
};
