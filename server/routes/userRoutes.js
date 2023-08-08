import express from "express";
import { getAllUsers, register, login } from "../controllers/userController.js";

const router = express.Router();

router.get("/all-users", getAllUsers);
router.post("/register", register);
router.post("/login", login);

export default router;
