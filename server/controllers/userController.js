import User from "../mongoDB/models/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .send({ message: "Please fill in all required fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .send({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return res
      .status(201)
      .send({ message: "User created", success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal server error", success: false, error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).send({
      userCount: user.length,
      message: "All users",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal server error", success: false, error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .send({ message: "Please fill in all required fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ message: "User does not exist", success: false });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .send({ message: "Invalid credentials", success: false });
    }
    return res
      .status(200)
      .send({ message: "Login successful", success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal server error", success: false, error });
  }
};
