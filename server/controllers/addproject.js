const projectModel = require("../models/project.model");
const multer = required("multer");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb = (null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const addproject = async (req, res,) => {
  const { img, title, description, techStack, projectUrl } = req.body;
  try {
    // uploading the img to the cloudinary database
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "SRTportfolio",
    });
    
    const projectadd = new projectModel({
      img: {
        url: result.secure_url,
      },
      title,
      description,
      techStack,
      projectUrl,
    });

    await projectadd.save();
    console.log("project added:- ", projectadd);
    res
      .status(200)
      .json({ message: "Project added to DB", Resposne: projectadd });
  } catch (err) {
    res.send(err);
  }
};

module.exports = addproject;
