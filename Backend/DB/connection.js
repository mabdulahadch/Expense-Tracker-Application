import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://buckerx:NmfWuUPau6983M3z@cluster1.7yu3ihw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

const connectDB= async ()=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB Connected Successfully!");
    }catch{
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
}

export default connectDB;