import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const isAuthenticated=async(req,res,next)=>{
    const {token}=req.cookies;
    if (!token) {
      res.json({
        sucess: false,
        message: "Login First",})
    }
      const data= jwt.verify(token,process.env.SECRET);
      req.user= await User.findById(data._id);
      next();

}