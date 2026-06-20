import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(()=>
{
    console.log("Connected to MongoDB");
    app.listen(5000,()=>{
        console.log("Server is running on port 5000");
    });
})
.catch(console.error);