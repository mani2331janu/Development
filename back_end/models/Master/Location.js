const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    location_name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    }
}, { timestamps: true });

module.exports = mongoose.model("Location", locationSchema);
