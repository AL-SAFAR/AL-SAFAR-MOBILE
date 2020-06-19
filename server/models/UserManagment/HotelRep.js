const mongoose = require("mongoose");

const HotelRepSchema = mongoose.Schema({
  //Representative Name
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  //representative NIC
  cnic: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  connectid: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("hotelRep", HotelRepSchema);
