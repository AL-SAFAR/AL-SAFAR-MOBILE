const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  AgentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "travelAgent",
    unique: true,
  },
  AgencyName: {
    type: String,
    required: true,
  },
  AgencyCharges: {
    type: Number,
    required: true,
  },
  AgencyLocation: {
    type: String,
    required: true,
  },
  AgencyDescription: {
    type: String,
    required: true,
  },
  AgencyLogo: {
    type: String,
  },
  services: {
    hotel: {
      type: Boolean,
      default: false,
    },
    guide: {
      type: Boolean,
      default: false,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("agentProfile", AdminSchema);
