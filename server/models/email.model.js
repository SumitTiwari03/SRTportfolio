const mongoose = require("mongoose"); 

const emailSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }, // Removed parentheses from `Date.now`
});

emailSchema.methods.formatDate = function () {
  const date = new Date(this.date);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}; 


const emailModel = mongoose.model("emailuser", emailSchema);

module.exports = emailModel;
