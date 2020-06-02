const mongoose = require("mongoose");

const TravelLogSchema = mongoose.Schema({
  carBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carBooking"
  },
  HotelBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotelBooking"
  },
  AgentBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "agentBooking"
  },
  GuideBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "guideBooking"
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer"
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  modifiedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("TravelLog", TravelLogSchema);
