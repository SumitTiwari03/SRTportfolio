const emailModel = require("../models/email.model");

const deleteemail = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Email ID is required" });
    }

    console.log("Deleting email with ID:", _id);

    const deletedEmail = await emailModel.findByIdAndDelete(_id);

    if (!deletedEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.status(200).json({
      message: "Email deleted successfully",
      details: deletedEmail
    });
  } catch (err) {
    console.error("Error deleting email:", err);
    res.status(500).json({
      message: "Error occurred while deleting the email",
      error: err.message
    });
  }
};

module.exports = deleteemail;
