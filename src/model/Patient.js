const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  patientName: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  age: { type: Number, required: true },
  description: { type: String, trim: true },
});

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient; // For CommonJS

