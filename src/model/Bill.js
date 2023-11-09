import { Schema, model } from "mongoose";

const BillSchema = Schema(
  {
    
    billName: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Bill", BillSchema);
