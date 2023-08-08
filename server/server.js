import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./mongoDB/database.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Blog App Using MERN Stack" });
});

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    connectDB();
  } catch (error) {
    console.log(`Error starting server: ${error}`);
  }
};

startServer();
