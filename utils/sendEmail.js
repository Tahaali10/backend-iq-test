const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
 auth: {
  user: process.env.EMAIL_USER,      // your gmail address
  pass: process.env.EMAIL_PASS,      // your 16-char app password, no spaces
},
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text,
  });
};

module.exports = sendEmail;
