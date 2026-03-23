const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const forgotCredentials = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Configure email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDEREMAIL,
      pass: process.env.PASSEMAIL,
    },
  });

  const mailOptions = {
    from: process.env.SENDEREMAIL,
    to: email,
    subject: "Dashboard Login Credentials Recovery",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Dashboard Login Credentials</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Hello,</p>
          
          <p style="font-size: 16px; color: #555; margin-bottom: 20px;">
            You requested your dashboard login credentials. Here they are:
          </p>
          
          <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <p style="margin: 10px 0; font-size: 15px;">
              <strong>Username:</strong> <span style="color: #667eea; font-family: monospace;">${process.env.DASHBOARD_USERNAME}</span>
            </p>
            <p style="margin: 10px 0; font-size: 15px;">
              <strong>Password:</strong> <span style="color: #667eea; font-family: monospace;">${process.env.LOGIN_PASSWORD}</span>
            </p>
          </div>
          
          <p style="font-size: 14px; color: #888; margin: 20px 0;">
            <strong>⚠️ Security Warning:</strong> Keep these credentials safe and do not share them with anyone. Delete this email after noting down the credentials.
          </p>
          
          <p style="font-size: 16px; color: #555; margin: 20px 0;">
            <a href="${process.env.DASHBOARD_URL || 'https://sumit-tiwari.vercel.app'}/dashboard_login" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Go to Dashboard Login
            </a>
          </p>
          
          <p style="font-size: 14px; color: #888; margin-top: 30px;">
            Best regards,<br>
            <strong>Sumit Tiwari</strong><br>
            Portfolio Dashboard
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
          <p>This email was sent because a credential recovery request was made. If you didn't request this, please ignore it.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ 
      message: "Credentials sent to your email. Please check your inbox and spam folder.",
      success: true 
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ 
      message: "Failed to send credentials. Please try again later.",
      error: error.message 
    });
  }
};

module.exports = forgotCredentials;
