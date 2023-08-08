import Blog from "../mongoDB/models/blogModel.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    if(!blogs) {
      return res.status(200).json({ message: "No blogs found", success: false });
    }
    return res.status(200).json({ BlogCount: blogs.length, message: "Blogs found", success: true, blogs });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

export const createBlog = async (req, res) => {};

export const updateBlog = async (req, res) => {};

export const getBlogById = async (req, res) => {};

export const deleteBlog = async (req, res) => {};
