const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  techStack: { type: [String], required: true },
  experience: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Developer", developerSchema);
