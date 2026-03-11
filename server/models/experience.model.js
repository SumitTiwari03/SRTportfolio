const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  Duration: { type: String, required: true },
  letter: { type: String},
  link: { type: String},
}, {
  timestamps: true
});

const experienceModel = mongoose.model("experience", experienceSchema);

module.exports = experienceModel;
