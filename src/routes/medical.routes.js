const express = require('express');
const router = express.Router();
const fs = require('fs');

// Load user credentials from JSON file
const userCredentials = JSON.parse(fs.readFileSync('medical-logins.json', 'utf-8'));

// Handle GET request for the login page
router.get('/login', (req, res) => {
  res.render('medical-login');
});

// Handle POST request for form submission
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the provided credentials match any user in the JSON file
  const user = userCredentials.find((user) => user.username === username && user.password === password);

  if (user) {
    // Successful login
    res.render('patientManagement',{ username });
  } else {
    // Failed login
    res.send('<script>alert("Access denied. You do not have permission to view these bills."); window.location.href = "/medical/login";</script>');
  }
});



module.exports = router;
