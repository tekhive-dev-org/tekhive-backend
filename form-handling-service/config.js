require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  EMAIL_TO: process.env.EMAIL_TO
};
