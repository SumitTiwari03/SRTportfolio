const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const emailModel = require("../models/email.model");
dotenv.config();

let emails
const Verify_admin = async (req, res, next) => {
  // const auth_header = req.headers.authorization;
  const cookies = req.headers.cookie;
  console.log("cookies:- ",cookies); 

  if (!cookies) return res.json({ Message: "No login found" });

  const token = cookies.split("=")[1];

  try {
    const token_role = jwt.verify(token, process.env.SECRET);
    if (token_role.role === "admin") {
      try {
        emails = await emailModel.find({});
        res.status(200).json(emails);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch emails", details: err });
      }
      next();
    }
  } catch (err) {
    console.log("Invalid web token");
    res.json({ Error: err });
  }

  next();
};

module.exports = Verify_admin;
