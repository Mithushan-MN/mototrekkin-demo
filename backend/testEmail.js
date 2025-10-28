// testEmail.js
import "dotenv/config"; // dotenv supports import directly
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer verification failed:", error.message);
  } else {
    console.log("Nodemailer verification successful");
  }
});

const testEmail = async () => {
  try {
    await transporter.sendMail({
      from: `"MotoTrekkin" <${process.env.EMAIL_USER}>`,
      to: "mithushan123456@gmail.com",
      subject: "Test Email from MotoTrekkin",
      text: "This is a test email to verify Nodemailer configuration.",
    });
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Test email failed:", error.message);
  }
};

testEmail(); // Top-level await works in Node.js 20+