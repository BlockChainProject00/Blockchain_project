import express from "express";
const router = express.Router();
import {
  createPatient,
  deletePatient,
  renderPatients,
  renderPatientEdit,
  renderPatientTable,
  editPatient,renderPatientForm
} from "../controllers/patients.controllers";

// Render all patients
router.get("/patient", renderPatients);

// Define a route for displaying the patient table
router.get("/patients", renderPatientTable);
router.get("/patients/add", renderPatientForm); // Add this route for rendering the patient form

router.post("/patients/add", createPatient); // Assuming createPatient is your controller function for adding patients

router.get("/patients/:id/edit", renderPatientEdit);

router.post("/patients/:id/edit", editPatient);

router.get("/patients/:id/delete", deletePatient);

export default router;
