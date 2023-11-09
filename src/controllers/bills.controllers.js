import Bill from "../model/Bill";

export const renderBills = async (req, res) => {
  try {
    const bills = await Bill.find().lean();
    res.render("patientManagement", {
        bills,
    });
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};
export const renderBillTable = async (req, res) => {
    try {
      const bills = await Bill.find().lean();
      res.render("partials/bills/billTable", { bills }); // Use the 'bills' variable here
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  export const renderBillForm = async (req, res) => {
    try {
      const bills = await Bill.find().lean();
      res.render("partials/bills/billForm", { bills });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
export const createBill = async (req, res, next) => {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.redirect("/bills");
  } catch (error) {
    return res.render("error", { errorMessage: error.message });
  }
};
export const renderBillEdit = async (req, res, next) => {
  const bill = await Bill.findById(req.params.id).lean();
  res.render("editbill", { bill });
};
export const editBill = async (req, res, next) => {
  const { id } = req.params;
  await Bill.updateOne({ _id: id }, req.body);
  res.redirect("/bills");
};
export const deleteBill = async (req, res, next) => {
  const { id } = req.params;
  await Bill.remove({ _id: id });
  res.redirect("/bills");
};

