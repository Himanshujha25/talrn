const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Developer = require("./models/Developer");

const app = express();
app.use(express.json());
app.use(cors());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo Error:", err));


app.get("/", (req, res) => {
  res.send("Developer Directory Backend with MongoDB");
});


app.get("/developers", async (req, res) => {
  try {
    const devs = await Developer.find().sort({ createdAt: -1 });
    res.json(devs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/developers", async (req, res) => {
  try {
    const { name, role, techStack, experience } = req.body;

    if (!name || !role || !techStack) {
      return res.status(400).json({ error: "name, role, techStack required" });
    }

    const newDev = await Developer.create({
      name: name.trim(),
       role: role.trim(),
       techStack: techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
       experience: Number(experience) || 0
    });

      res.status(201).json(newDev);
  } catch (err) {
     res.status(500).json({ error: "Server error" });
  }
});


 const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
