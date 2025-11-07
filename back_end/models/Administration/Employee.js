const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employee_id: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    blood_group: { type: String, required: true },

    // Contact Info
    email: { type: String, required: true },
    mobile_no: { type: String, required: true },
    emg_mobile_no: { type: String, required: true },

    // Address Info
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },

    // Bank Details
    bank_name: { type: String, required: true },
    account_number: { type: String, required: true },
    ifsc_code: { type: String, required: true },

    // Optional File Uploads
    profile_image: { type: String },
    id_proof: { type: String },
    degree_certificate: { type: String },
    experience_certificate: { type: String },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    trash: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("master_employee", employeeSchema);
