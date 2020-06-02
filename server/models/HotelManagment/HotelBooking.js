const mongoose = require("mongoose");

const HotelBookingSchema = mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room"
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotel"
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer"
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  isPending: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports = mongoose.model("hotelBooking", HotelBookingSchema);
