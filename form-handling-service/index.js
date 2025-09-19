const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { sendContactEmail } = require("./email");
const config = require("./config");

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
});
app.use(limiter);


app.post("/api/contact/form", async (req, res) => {
  const { firstname, lastname, email, phonenumber, message } = req.body;

  if (!firstname || !lastname || !email || !phonenumber || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await sendContactEmail({ firstname, lastname, email, phonenumber, message });
    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});


app.listen(config.PORT, () => {
  console.log(`🚀 Form handler running on port ${config.PORT}`);
});
