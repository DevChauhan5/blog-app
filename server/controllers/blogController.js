import mongoose from "mongoose";
import Blog from "../mongoDB/models/blogModel.js";
import User from "../mongoDB/models/userModel.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    if (!blogs) {
      return res
        .status(200)
        .json({ message: "No blogs found", success: false });
    }
    return res.status(200).json({
      BlogCount: blogs.length,
      message: "Blogs found",
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res
        .status(400)
        .json({ message: "Please enter all fields", success: false });
    }
    const exisingUser = await User.findById(user);
    if (!exisingUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const newblog = new Blog({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newblog.save({ session });
    exisingUser.blogs.push(newblog);
    await exisingUser.save({ session });
    await session.commitTransaction();
    await newblog.save();
    return res
      .status(201)
      .json({ message: "Blog created", success: true, newblog });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Blog updated", success: true, blog });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "No blog found", success: false });
    }
    return res.status(200).json({ message: "Blog found", success: true, blog });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).json({ message: "Blog deleted", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("blogs");
    if (!user) {
      return res.status(404).json({ message: "No user found", success: false });
    }
    return res
      .status(200)
      .json({ message: "User blogs found", success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};
