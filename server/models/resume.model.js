const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  url: { type: String, required: true },
  fileName: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
}, {
  timestamps: true
});

const resumeModel = mongoose.model("resume", resumeSchema);

module.exports = resumeModel;
