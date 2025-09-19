const nodemailer = require("nodemailer");
const config = require("./config");

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: false,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS
  }
});

async function sendContactEmail({ firstname, lastname, email, phonenumber, message, project = "TechHive" }) {
  const mailOptions = {
    from: `"${firstname} ${lastname}" <${email}>`,
    to: config.EMAIL_TO,
    subject: `${project} - Contact Form`,
    text: `You received a new message from ${firstname} ${lastname} (${email})\n\n(${phonenumber})\n\n${message}`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendContactEmail };
