import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_Host,
  port: process.env.SMTP_Port,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_Email,
    pass: process.env.SMTP_Pass,
  },
});

export default transporter;