const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const nodemailer = require('nodemailer');

const SECRET = 'mysecretkey';
const OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes

let otpStore = {}; // In-memory store for demo; replace with Redis or DB in production

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harsha7595@gmail.com',
    pass: 'gdbuxirnyqcjltvb'
  }
});

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'User registered successfully' });
    }
  );
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  });
});

// Request OTP
router.post('/request-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + OTP_EXPIRY;

  otpStore[email] = { otp, expiry };

 const mailOptions = {
  from: 'your-email@gmail.com',
  to: email,
  subject: 'Password Reset OTP',
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #007bff;">Password Reset Request</h2>
      <p>Hello,</p>
      <p>You requested to reset your password. Use the OTP below to complete the process:</p>
      <h1 style="letter-spacing: 4px; color: #333;">${otp}</h1>
      <p>This OTP is valid for <strong>5 minutes</strong>.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Thanks,<br>Your App Team</p>
    </div>
  `
};

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send OTP' });
    } else {
      res.json({ message: 'OTP sent to email' });
    }
  });
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!otpStore[email]) {
    return res.status(400).json({ error: 'No OTP requested for this email' });
  }

  const { otp: storedOtp, expiry } = otpStore[email];

  if (Date.now() > expiry) {
    delete otpStore[email];
    return res.status(400).json({ error: 'OTP expired' });
  }

  if (storedOtp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  db.query(
    'UPDATE users SET password = ? WHERE email = ?',
    [hashedPassword, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      delete otpStore[email];
      res.json({ message: 'Password updated successfully' });
    }
  );
});

module.exports = router;
