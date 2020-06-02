const mongoose = require("mongoose");

const GuideBookingSchema = mongoose.Schema({
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "guide",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  isPending: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
});

module.exports = mongoose.model("guideBooking", GuideBookingSchema);
