const dotenv = require("dotenv");
const emailModel = require("../models/email.model");
dotenv.config();

const mailer = async (req, res) => {
  // var username='Atul tiwari'
  // var message='I like your portfolio can you also make one for me'
  const { username, message, email } = req.body;
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDEREMAIL,
      pass: process.env.PASSEMAIL,
    },
  });
  
  var mailOptions = {
    from: process.env.SENDEREMAIL,
    to: email,
    subject: "SRT || Thankyou for contacting sumit",
    html: `<div style="font-family: Arial, sans-serif; color: #333;">
    <p>Hi ${username},</p>
    <p>We appreciate you contacting us. Our team will get back to you as soon as possible.</p>
    <p>In the meantime, feel free to explore our website for more information.</p>
    
    <p>Best regards,</p>
    <p><strong>Sumit Tiwari</strong></p>
    <p>This was your message from the form:-<br><b>Message:- </b>${message}<br></p>
    <h1>Thank You for Reaching Out!</h1>
      
      <footer style="margin-top: 20px; font-size: 12px; color: #777;">
        Feel free to reach out to Sumit...!
      </footer>

    </div>`,
  };
  transporter.sendMail(mailOptions,async (error, info) => {
    if (error) {
      console.log(error);
    } else {
      const useremail = new emailModel({
        username,
        email,
        message,
      });
      await useremail.save();
      console.log("Email sent: " + info.response);

      res.send({message:"Mail sent successfully",Resposne:useremail});
    }
  });
};
module.exports = mailer;
