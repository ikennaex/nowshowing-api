const blogModel = require("../models/blog");

const postBlog = async(req, res) => {
    const {title, content, img, author} = req.body;

    try {
        const response = await blogModel.create({title, content, img, author})
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(400).json({message: "server error"})
    }
}

const getBlog = async(req, res) => {
    
    try {
        const response = await blogModel.find()
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

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

module.exports = {
    postBlog,
    getBlog,
    getBlogById
}