import express from "express";
const router = express.Router();
import {
  createBill,
  deleteBill,
  renderBills,
  renderBillEdit,
  renderBillTable,
  editBill,renderBillForm
} from "../controllers/bills.controllers";

// Render all bills
router.get("/bill", renderBills);

// Define a route for displaying the Bill table
router.get("/bills", renderBillTable);
router.get("/bills/add", renderBillForm); // Add this route for rendering the Bill form

router.post("/bills/add", createBill); // Assuming createBill is your controller function for adding bills

router.get("/bills/:id/edit", renderBillEdit);
router.post("/bills/:id/edit", editBill);


router.get("/bills/:id/delete", deleteBill);

export default router;
