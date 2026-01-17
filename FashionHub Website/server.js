const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/reviewsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Review Schema
const reviewSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String,
});

const Review = mongoose.model("Review", reviewSchema);

// API to Get All Reviews
app.get("/reviews", async (req, res) => {
    const reviews = await Review.find().sort({ _id: -1 });
    res.json(reviews);
});

// API to Submit a Review
app.post("/reviews", async (req, res) => {
    const { name, rating, review } = req.body;
    if (!name || !rating || !review) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const newReview = new Review({ name, rating, review });
    await newReview.save();
    res.json({ message: "Review added!", review: newReview });
    
});

// Email Schema
const emailSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
  });
  
  const Email = mongoose.model("Email", emailSchema);
  
  // Newsletter Signup API
  app.post("/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "Email is required" });
  
      const newEmail = new Email({ email });
      await newEmail.save();
      res.status(201).json({ message: "Subscribed successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Error subscribing", error: err.message });
    }
  });


// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});



