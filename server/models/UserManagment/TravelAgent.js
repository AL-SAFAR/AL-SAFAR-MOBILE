const mongoose = require("mongoose");

const TravelAgentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true
  },
  cnic: {
    type: String,
    required: true
  },
  agentID: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  serviceCharges: {
    type: Number,
  },
  starRating: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("travelAgent", TravelAgentSchema);
