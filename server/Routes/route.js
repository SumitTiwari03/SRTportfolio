const express = require("express");
const cloudinary = require("../controllers/cloudinary");
const multer = require("multer");
// multer middleware
// const upload = require("../middleware/multer");

// all controllers
const mailer = require("../controllers/mailer");
const mailreply = require("../controllers/replymail");
const login = require("../controllers/authenticate");
const editproject = require("../controllers/editproject");
const deleteproject = require("../controllers/deleteproject");

// all models
const emailModel = require("../models/email.model");
const projectModel = require("../models/project.model");

const route = express.Router();

const upload = multer({ dest: "uploads/" });

route.post(
  "/dashboard/addproject",
  upload.single("image"),
  async (req, res) => {
    const { title, description, techStack, projectUrl,gitUrl } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    try {
      // Uploading image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "SRTPortfolio",
      });

      // Creating project document
      const projectAdd = new projectModel({
        img: {
          url: result.secure_url,
        },
        title,
        description,
        techStack: JSON.parse(techStack), // If techStack is sent as a stringified array
        projectUrl,
        gitUrl
      });

      await projectAdd.save();
      res
        .status(200)
        .json({ message: "Project added successfully", project: projectAdd });
    } catch (err) {
      console.error("Error while uploading project:", err);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  }
);

// have to make an api to edit the exitsing projects
route.put("/dashboard/editproject", editproject);

// to delete the project
route.delete("/dashboard/deleteproject", deleteproject);

// dashboard se mail reply krne wala function
route.post("/dashboard/mailreply", mailreply);

// get in touch wala mails
route.post("/mail", mailer);

// dashboard login route and function
route.post("/dashboard_login", login);

route.get("/dashboard/getproject", async (req, res) => {
  try {
    const projects = await projectModel.find({});
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch emails", details: err });
  }
});

// getting all the email on the dashboard
route.get("/dashboard/profile", async (req, res) => {
  try {
    const emails = await emailModel.find({});
    res.status(200).json(emails);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch emails", details: err });
  }
});

module.exports = route;
