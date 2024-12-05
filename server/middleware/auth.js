const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const Verify_admin = (req, res, next) => {
  // const auth_header = req.headers.authorization;
  const cookies = req.headers.cookie;

  if (!cookies) return res.json({ Message: "No login found" });
  
  const token = cookies.split("=")[1];
  
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
