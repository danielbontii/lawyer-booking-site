const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: `${process.env.SENDER_EMAIL}`,
    pass: `${process.env.SENDER_EMAIL_PASSWORD}`,
  },
});

const sendMail = async (users, subject, text) => {
  const mailOptions = {
    from: "lbav1@gmail.com",
    to: users.map((user) => user.email).join(", "),
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.error(err.message);
    } 
  });
};

module.exports = { sendMail };
