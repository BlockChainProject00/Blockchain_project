const express = require("express");
const router = express.Router();
const fs = require("fs");

// Load user credentials from JSON file
const userCredentials = JSON.parse(
  fs.readFileSync("insurance-logins.json", "utf-8")
);
const Patient = require('../model/Patient');
function isAuthenticated(req, res, next) {
  const { username, password } = req.body;

  const user = userCredentials.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // Successful login
    req.user = user;
    next();
  } else {
    // Failed login
    // res.send('<script>alert("Access denied. You do not have permission to view these bills."); window.location.href = "/insurance/login";</script>');
    res.send("invalied");
  }
}

router.get("/login", (req, res) => {
  res.render("insurance-login");
});

// Handle POST request for form submission (authentication)
router.post("/login", isAuthenticated, (req, res) => {
  res.render("search", { username: req.user.username });
});
// Add a route for displaying the search form
router.get("/search", (req, res) => {
  res.render("search");
});

const moment = require('moment'); // Include moment.js

router.post("/search", (req, res) => {
  const { patientName } = req.body;

  // Perform a database query to search for patients by name
  // Modify this code to interact with your MongoDB database

  Patient.find({ patientName }, (err, patients) => {
    if (patients.length > 0) {
      // Prepare the data for rendering in the template
      const resultsData = {
        patients: patients.map((patient) => ({
          patientName: patient.patientName,
          amount: patient.amount,
          age: patient.age,
          description: patient.description,
          createdAt: moment(patient.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment(patient.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        })),
      };

      // Render the search-results.hbs template with the data
      res.render("search-results", resultsData);
    } else {
      // No patients found
      res.send("No patients found with the given name.");
    }
  });
});



module.exports = router;
