const dotenv = require("dotenv");
dotenv.config();

const mailreply = async (req, res) => {
  const { to, subject, body, message } = req.body.replyData;
  console.log("Request body:- ",req.body);
  console.log("to in the reply mail :- ",to);
  console.log("subject in the reply mail :- ",subject);
  console.log("body in the reply mail :- ",body);
  console.log("message in the reply mail :- ",message);
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
    to: to, 
    subject: subject,
    html: `<div style="font-family: Arial, sans-serif; color: #333;">
    <p>Hello! Greeting from Sumit.</p>
    <p>${body}</p>
    
    <p>Best regards,</p>
    <p><strong>Sumit Tiwari</strong></p>
    <h3>Replying To :-</h3><br>
    <p>${message}<br></p>
    <h1>Thank You for Reaching Out!</h1>
      
      <footer style="margin-top: 20px; font-size: 12px; color: #777;">
        Feel free to reach out to Sumit...!
      </footer>

    </div>`,
  };
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);

      res.send({ message: "Mail sent successfully" });
    }
  });
};
module.exports = mailreply;
