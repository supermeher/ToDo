import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from 'cors'
const app = express();
config({
  path: "./database/config.env",
});

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials:true,
  origin:[process.env.FRONTEND_URL],
  methods:['GET','POST','PUT','DELETE']
}));
//Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);



app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

//ErrorMiddleware
app.use(errorMiddleware)
export default app;
