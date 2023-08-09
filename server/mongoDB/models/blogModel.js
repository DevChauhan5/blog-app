import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    image: {
      type: String,
      required: [true, "Please provide an image"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "User Id is require"]
    }
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
