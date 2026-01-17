const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL database");
});

// GET all reviews
app.get("/reviews", (req, res) => {
    db.query("SELECT * FROM reviews ORDER BY id DESC", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// POST a review
app.post("/reviews", (req, res) => {
    const { name, rating, review } = req.body;

    if (!name || !rating || !review) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const query = "INSERT INTO reviews (name, rating, review) VALUES (?, ?, ?)";
    db.query(query, [name, rating, review], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Review added!", reviewId: result.insertId });
    });
});

