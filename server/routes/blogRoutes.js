import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/all-blogs", getAllBlogs);
router.post("/create-blog", createBlog);
router.put("/update-blog/:id", updateBlog);
router.get("/get-blog/:id", getBlogById);
router.delete("/delete-blog/:id", deleteBlog);

export default router;
