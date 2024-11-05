
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Change to your email provider if needed
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send an email
export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to:', to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};
