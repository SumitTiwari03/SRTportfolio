const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const Connection = require("./config");

const app = express();

app.use(cookieParser());
 
// const token = req.cookies.sumit_admin; // Access cookie directly

app.use(express.json());
 
const allowedOrigins = [
  "http://localhost:5173", // For local development
  "https://sumit-dev-3426.onrender.com", // Replace with your deployed frontend domain
  "https://sumit-dev-gilt.vercel.app"
]; 

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


const api_route = require("./Routes/route");
app.use('/api',api_route)

app.get("/", (req, res) => {
  return res.send("Home page");
});



app.listen("8080", async () => {
  try {
    await Connection;
    console.log("Connect to port http://localhost:8080");
  } catch {
    console.log("Error while connecting to DB");
  }
});
