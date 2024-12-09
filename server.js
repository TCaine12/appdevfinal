const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./Models/user"); // Adjust the path based on where `user.js` is located

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/myWeather", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Authentication API endpoint
app.post("/api/auth", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).send("Invalid credentials");
    }

    user.lastLogin = new Date();
    await user.save();

    res.status(201).send("Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Start the server
app.listen(3010, () => console.log("Server running on port 3010"));
