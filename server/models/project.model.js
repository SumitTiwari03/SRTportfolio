const mongoose = require("mongoose"); // Fixed the spelling from "mongooes" to "mongoose"

const projectSchema = new mongoose.Schema({
  img: {
    url: { type: String, required: true },
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: [String], required: true },
  projectUrl: { type: String, required: true }, 
  gitUrl: { type: String, required: true },
});

const projectModel = mongoose.model("project", projectSchema);

module.exports = projectModel;
