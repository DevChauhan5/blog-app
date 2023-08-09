import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  getUserBlogs,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/all-blogs", getAllBlogs);
router.post("/create-blog", createBlog);
router.put("/update-blog/:id", updateBlog);
router.get("/get-blog/:id", getBlogById);
router.delete("/delete-blog/:id", deleteBlog);
router.get("/user-blogs/:id", getUserBlogs);

export default router;
