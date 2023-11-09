import Patient from "../model/Patient";

export const renderPatients = async (req, res) => {
  try {
    const patients = await Patient.find().lean();
    res.render("index", {
      patients,
    });
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};
export const renderPatientTable = async (req, res) => {
  try {
    const patients = await Patient.find().lean();
    res.render("partials/patients/patientTable", { patients });


  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
export const renderPatientForm = async (req, res) => {
  try {
    const patients = await Patient.find().lean();
    res.render("partials/patients/patientForm", { patients });


  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
export const createPatient = async (req, res, next) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.redirect("/patients");
  } catch (error) {
    return res.render("error", { errorMessage: error.message });
  }
};
export const renderPatientEdit = async (req, res, next) => {
  const patient = await Patient.findById(req.params.id).lean();
  res.render("edit", { patient });
};
export const editPatient = async (req, res, next) => {
  const { id } = req.params;
  await Patient.updateOne({ _id: id }, req.body);
  res.redirect("/patients");
};
export const deletePatient = async (req, res, next) => {
  const { id } = req.params;
  await Patient.remove({ _id: id });
  res.redirect("/patients");
};

