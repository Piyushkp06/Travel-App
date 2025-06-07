import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  vehicle: {
    number: { type: String, required: true },
    type: { type: String, enum: ["sedan", "SUV", "auto", "bike"], required: true }
  },
  operatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Operator",
    required: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Driver = mongoose.model("Drivers", driverSchema);
export default Driver;
