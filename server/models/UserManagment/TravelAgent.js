const mongoose = require("mongoose");

const TravelAgentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  serviceCharges: {
    type: Number,
  },
  starRating: {
    type: Number,
    default: 0,
  },
  connectid: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("travelAgent", TravelAgentSchema);
