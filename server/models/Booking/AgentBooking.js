const mongoose = require("mongoose");

const AgentBookingSchema = mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "travelAgent"
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer"
  },

  isPending: {
    type: Boolean,
    default: false
  },
  CustomerLoginCreds: {
    email: {
      type: String,
      default: null
    },
    password: {
      type: String,
      default: null
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("agentBooking", AgentBookingSchema);
