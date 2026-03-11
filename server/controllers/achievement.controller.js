const achievementModel = require("../models/achievement.model");

// Get all achievements
const getAllAchievements = async (req, res) => {
  try {
    const achievements = await achievementModel.find({});
    res.status(200).json(achievements);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch achievements", details: err.message });
  }
};

// Add new achievement
const addAchievement = async (req, res) => {
  try {
    const { college, fest, ranker, date, letter, link } = req.body;

    const newAchievement = new achievementModel({
      college,
      fest,
      ranker,
      date,
      letter,
      link
    });

    await newAchievement.save();
    res.status(200).json({ message: "Achievement added successfully", achievement: newAchievement });
  } catch (err) {
    res.status(500).json({ error: "Failed to add achievement", details: err.message });
  }
};

// Update achievement
const updateAchievement = async (req, res) => {
  try {
    const { _id, college, fest, ranker, date, letter, link } = req.body;

    const updatedAchievement = await achievementModel.findByIdAndUpdate(
      _id,
      { college, fest, ranker, date, letter, link },
      { new: true }
    );

    if (!updatedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res.status(200).json({ message: "Achievement updated successfully", achievement: updatedAchievement });
  } catch (err) {
    res.status(500).json({ error: "Failed to update achievement", details: err.message });
  }
};

// Delete achievement
const deleteAchievement = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedAchievement = await achievementModel.findByIdAndDelete(_id);

    if (!deletedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res.status(200).json({ message: "Achievement deleted successfully", achievement: deletedAchievement });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete achievement", details: err.message });
  }
};

module.exports = {
  getAllAchievements,
  addAchievement,
  updateAchievement,
  deleteAchievement
};
