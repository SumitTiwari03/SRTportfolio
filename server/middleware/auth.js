const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const Verify_admin = (req, res, next) => {
  const auth_header = req.headers.authorization;
  if (!auth_header) return res.json({ Message: "Auth header is missing" });
  const token = auth_header.split(" ")[1];
  try {
    const token_role = jwt.verify(token, process.env.SECRET);
    if (token_role.role === "admin") {
      next();
    }
  } catch (err) {
    console.log("Invalid web token");
    res.json({ Error: err });
  }
  next();
};

module.exports = Verify_admin;
