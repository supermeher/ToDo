import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/error.js";
import { sendCookie } from "../utility/features.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("user already exists", 400));
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPassword });
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    res.json(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Either Email or Pasword is invalid", 400));
    }
    sendCookie(user, res , `Welcome back, ${user.name}`, 200);
  } catch (error) {
    res.json(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_URI === "Development" ? "lax" : "none",
      secure: process.env.NODE_URI === "Development" ? false : true,
    })
    .json({
      success: true,
    });
};
