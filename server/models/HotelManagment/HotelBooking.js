const mongoose = require("mongoose");

const HotelBookingSchema = mongoose.Schema({
  RoomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room",
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotel",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment",
  },
  NoOfRooms: {
    type: Number,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
  },

  cancelDate: {
    type: Date,
  },
  starRating: {
    type: Number,
  },
  feedback: {
    type: String,
  },
});

module.exports = mongoose.model("hotelBooking", HotelBookingSchema);
