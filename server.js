import app from "./app.js";
import connectDB from "./database/database.js";

connectDB;

app.listen(process.env.PORT, () => {
  console.log(`Server is runnning on port ${process.env.PORT} in ${process.env.NODE_URI} mode`);
});
