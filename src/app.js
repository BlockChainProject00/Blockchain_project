import path from "path";
import express from "express";
import morgan from "morgan";
import { create } from "express-handlebars";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import expressSession from 'express-session';
import User from './model/User';
import hospitalRoutes from "./routes/hospital.routes"; // Import hospital-related routes
import medicalRoutes from "./routes/medical.routes"; // Import medical-related routes
import insuranceRoutes from "./routes/insurance.routes"; // Import insurance-related routes
import patientRoutes from "./routes/patient.routes"; // Correct import path
import billsRoutes from './routes/bills.routes';
const app = express();
require('dotenv').config();

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.use(expressSession({
  secret: "abc",
  resave: false,
  saveUninitialized: false,
}));
// Initialize Passport.js and set up LocalStrategy for username and password login
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");
app.use("/patients", patientRoutes);
app.use('/bills', billsRoutes);
// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
  // Render the dashboard page by default
  res.render("dashboard");
});
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
app.use("/hospital", hospitalRoutes);
app.use("/medical", medicalRoutes);
app.use("/insurance", insuranceRoutes);
// routes
app.use(patientRoutes); // Use patient-related routes
app.use(billsRoutes); // Use patient-related routes
// public route
app.use(express.static(path.join(__dirname, 'public')));
app.get('/about', (req, res) => {
  res.render('about', {
      pageTitle: 'About Us',
      location: 'patients in our community',
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
      pageTitle: 'Contact Us',
  });
});

// Set up route for user login
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login', // Modify this route according to your login page
}));
// app.use((req, res, next) => {
//   res.status(404).render("404");
// });

export default app;
