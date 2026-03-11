const skillModel = require("../models/skill.model");

// Get all skills
const getAllSkills = async (req, res) => {
  try {
    const skills = await skillModel.find({});
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch skills", details: err.message });
  }
};

// Add new skill
const addSkill = async (req, res) => {
  try {
    const { category, items } = req.body;

    const newSkill = new skillModel({
      category,
      items
    });

    await newSkill.save();
    res.status(200).json({ message: "Skill added successfully", skill: newSkill });
  } catch (err) {
    res.status(500).json({ error: "Failed to add skill", details: err.message });
  }
};

// Update skill
const updateSkill = async (req, res) => {
  try {
    const { _id, category, items } = req.body;

    const updatedSkill = await skillModel.findByIdAndUpdate(
      _id,
      { category, items },
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(200).json({ message: "Skill updated successfully", skill: updatedSkill });
  } catch (err) {
    res.status(500).json({ error: "Failed to update skill", details: err.message });
  }
};

// Delete skill
const deleteSkill = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedSkill = await skillModel.findByIdAndDelete(_id);

    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(200).json({ message: "Skill deleted successfully", skill: deletedSkill });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete skill", details: err.message });
  }
};

module.exports = {
  getAllSkills,
  addSkill,
  updateSkill,
  deleteSkill
};
