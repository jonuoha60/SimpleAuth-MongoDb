import express from 'express';
import mongoose from 'mongoose';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import UserModel from './users.js'; // ⚠️ make sure this file uses ES module exports

dotenv.config(); // Load .env variables

const app = express()
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/peopledb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});


app.post("/signup", async(req, res) => {
    const {username, email, password, confirmPassword} = req.body;

   
    try{
     if(!username || !email) {
        res.status(402).json("Username or email not provided")
    }
    const existingEmail = await UserModel.findOne({ email });
    const existingUsername = await UserModel.findOne({ username });

    if (existingEmail) {
      return res.status(400).json({ message: "Email is already taken" });
    }
    if (existingUsername) {
      return res.status(401).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
     const newUser = new UserModel({
      email,
      username,
      confirmPassword,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
        user: newUser,
        message: "User successfully created"
    })

    }catch(err) {
    console.error("Error in /signup", err)
    res.status(500).json({ message: "Error registering user", error: err });
    }
})

app.post("/signin", async(req, res) => {
    const email = req.body.email.trim().toLowerCase();
    const { password } = req.body;

    try{

    const existingUser = await UserModel.findOne({ email })

    if(!existingUser){
        res.status(402).json("Email doesn't exist")
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordValid) {
        res.status(401).json("Invalid Password")
    }

    res.status(200).json({
        message: "Successfully logged in",
        email: existingUser.email,
        userId: existingUser._id,
        username: existingUser.username,
    })

    }catch(err){
        console.error("Error in /signin", err)
        res.status(500).json({ message: "Error signing user", error: err })
    }
})

const PORT = 5000; // Fallback if .env is missing

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})