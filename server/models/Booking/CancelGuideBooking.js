const mongoose = require("mongoose");

const GuideBookingSchema = mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "guideBooking",
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "guide",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  status: {
    type: String,
    default: "pending",
  },
  sentFrom: {
    type: String,
  },
  cancelDate: {
    type: Date,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("cancelguideBooking", GuideBookingSchema);
