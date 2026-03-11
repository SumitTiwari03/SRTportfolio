const projectModel = require("../models/project.model");
const cloudinary = require("./cloudinary");
const fs = require("fs");

const editproject = async (req, res) => {
  try {
    const id = req.body._id;
    console.log("Editing project with ID:", id);
    console.log("Request body:", req.body);
    console.log("File:", req.file);

    // Prepare update data
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      projectUrl: req.body.projectUrl,
      gitUrl: req.body.gitUrl,
    };

    // Handle techStack - parse if it's a JSON string
    if (req.body.techStack) {
      try {
        updateData.techStack = JSON.parse(req.body.techStack);
      } catch (e) {
        updateData.techStack = req.body.techStack;
      }
    }

    // If a new image is uploaded, upload it to Cloudinary
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "SRTPortfolio",
        });

        updateData.img = {
          url: result.secure_url,
        };

        // Delete the temporary file
        fs.unlinkSync(req.file.path);

        console.log("New image uploaded to Cloudinary:", result.secure_url);
      } catch (uploadErr) {
        console.error("Error uploading to Cloudinary:", uploadErr);
        return res.status(500).json({
          Message: "Error uploading image",
          error: uploadErr.message
        });
      }
    }

    // Update the project in database
    const updateProject = await projectModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updateProject) {
      return res.status(404).json({ Message: "Project not found" });
    }

    res.status(200).json({
      Message: "Project Updated Successfully",
      details: updateProject
    });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({
      Message: "Error occurred while updating the Project",
      error: err.message
    });
  }
};

module.exports = editproject;  
