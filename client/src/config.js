const dev = process.env.NODE_ENV !== "production";

export const MAIL_API = dev
  ? "http://localhost:5731/api"
  : "https://sumit-dev-api.onrender.com/api";
