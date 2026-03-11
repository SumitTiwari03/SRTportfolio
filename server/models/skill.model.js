const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: { type: [String], required: true },
}, {
  timestamps: true
});

const skillModel = mongoose.model("skill", skillSchema);

module.exports = skillModel;
