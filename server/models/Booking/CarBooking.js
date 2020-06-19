const mongoose = require("mongoose");

const CarBookingSchema = mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "driver",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  userName: {
    type: String,
  },
  pickUp: {
    type: Object,
    default: {},
  },
  dropOff: {
    type: Object,
    default: {},
  },
  isPending: {
    type: Boolean,
    default: false,
  },
  fare: {
    type: Number,
    default: 0,
  },
  // later: {
  //   onDate: {
  //     type: Date,
  //     default: Date.now
  //   },
  //   duration: {
  //     type: Date
  //   },
  //   airlineCode: {
  //     type: String,
  //     default: null
  //   }
  // },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("carBooking", CarBookingSchema);
