const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  techStack: [String],
  experience: { type: Number, default: 0 },
  description: { type: String },
  joiningDate: { type: Date, default: Date.now },
  photo: { type: String }
});

module.exports = mongoose.model("Developer", developerSchema);
