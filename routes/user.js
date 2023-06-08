import express from "express";
import { loginUser, register,getMyProfile,logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/me",isAuthenticated,getMyProfile );
router.post("/new",register );
router.post('/login',loginUser);
router.get('/logout',logout)


export default router;
