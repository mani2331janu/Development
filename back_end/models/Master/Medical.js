const mongoose = require("mongoose");

const medicalSchema = new mongoose.Schema(
  {
    location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    medical_name: {
      type: String,
      required: true,
      trim: true,
    },
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
      enum: ["yes", "no"], 
      default: "no",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("master_medical", medicalSchema);
