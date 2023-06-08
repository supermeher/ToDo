import mongoose from "mongoose";

const connectDB=mongoose.connect(process.env.MONGO_URI,{
    dbName:'ToDo'
}).then(()=>{
    console.log('Database Connected');
}).catch(e=>{console.log(e);})

export default connectDB;