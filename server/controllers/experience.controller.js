const experienceModel = require("../models/experience.model");

// Get all experiences
const getAllExperiences = async (req, res) => {
  try {
    const experiences = await experienceModel.find({});
    res.status(200).json(experiences);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch experiences", details: err.message });
  }
};

// Add new experience
const addExperience = async (req, res) => {
  try {
    const { company, role, Duration, letter, link } = req.body;

    const newExperience = new experienceModel({
      company,
      role,
      Duration,
      letter,
      link
    });

    await newExperience.save();
    res.status(200).json({ message: "Experience added successfully", experience: newExperience });
  } catch (err) {
    res.status(500).json({ error: "Failed to add experience", details: err.message });
  }
};

// Update experience
const updateExperience = async (req, res) => {
  try {
    const { _id, company, role, Duration, letter, link } = req.body;

    const updatedExperience = await experienceModel.findByIdAndUpdate(
      _id,
      { company, role, Duration, letter, link },
      { new: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json({ message: "Experience updated successfully", experience: updatedExperience });
  } catch (err) {
    res.status(500).json({ error: "Failed to update experience", details: err.message });
  }
};

// Delete experience
const deleteExperience = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedExperience = await experienceModel.findByIdAndDelete(_id);

    if (!deletedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json({ message: "Experience deleted successfully", experience: deletedExperience });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete experience", details: err.message });
  }
};

module.exports = {
  getAllExperiences,
  addExperience,
  updateExperience,
  deleteExperience
};
