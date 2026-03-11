const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  college: { type: String, required: true },
  fest: { type: String, required: true },
  ranker: { type: String, required: true },
  date: { type: String, required: true },
  letter: { type: String, required: true },
  link: { type: String, default: '' },
}, {
  timestamps: true
});

const achievementModel = mongoose.model("achievement", achievementSchema);

module.exports = achievementModel;
