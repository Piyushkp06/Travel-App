import mongoose from "mongoose";

const operatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  contactNumber: {
    type: String,
    required: true
  },
  drivers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drivers"
  }]
}, { timestamps: true });

const Operator = mongoose.model("Operators", operatorSchema);
export default Operator;
