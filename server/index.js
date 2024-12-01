const express = require("express");
const Connection = require("./config");
const app = express();

const mailer = require("./controllers/mailer");
const verifyAdmin = require("./middleware/auth");
const login = require("./controllers/authenticate");
const cors = require("cors");

app.use(
  cors({
    origin: [""],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Home page");
});

app.post("/api/mail", mailer);
app.post("/api/dashboard_login", login);

app.get("/api/dashboard", verifyAdmin, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!" });
});
app.listen("8080", async () => {
  try {
    await Connection;
    console.log("Connect to port http://localhost:8080");
  } catch {
    console.log("Error while connecting to DB");
  }
});
