const resumeModel = require("../models/resume.model");
const cloudinary = require("./cloudinary");
const fs = require("fs");

// Get current resume
const getResume = async (req, res) => {
  try {
    const resume = await resumeModel.findOne().sort({ createdAt: -1 });
    if (!resume) {
      return res.status(404).json({ message: "No resume found" });
    }
    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resume", details: err.message });
  }
};

// Upload/Update resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "SRTPortfolio/Resume",
      resource_type: "raw", // For PDF files
    });

    // Delete temporary file
    fs.unlinkSync(req.file.path);

    // Delete old resume entries
    await resumeModel.deleteMany({});

    // Create new resume entry
    const newResume = new resumeModel({
      url: result.secure_url,
      fileName: req.file.originalname,
    });

    await newResume.save();

    res.status(200).json({
      message: "Resume uploaded successfully",
      resume: newResume
    });
  } catch (err) {
    console.error("Error uploading resume:", err);
    res.status(500).json({
      error: "Failed to upload resume",
      details: err.message
    });
  }
};

// Delete resume
const deleteResume = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedResume = await resumeModel.findByIdAndDelete(_id);

    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({
      message: "Resume deleted successfully",
      resume: deletedResume
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete resume",
      details: err.message
    });
  }
};

module.exports = {
  getResume,
  uploadResume,
  deleteResume
};
