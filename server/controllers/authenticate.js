const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const login = (req, res) => {
  const { username, password } = req.body;
  if ( 
    username === process.env.DASHBOARD_USERNAME &&
    password === process.env.LOGIN_PASSWORD
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.SECRET, {
      expiresIn: "1h",
    });
    // setting cookies for the authentication
    res.cookie("sumit_admin", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true, 
      sameSite: "lax",
    });
    res.send({
      "Message:- ": `Welcome to dashboard Sumit`,
      Token: token,
    });
  } else {
    res.status(401).send("Invalid credentail");
  }
};

module.exports = login;
