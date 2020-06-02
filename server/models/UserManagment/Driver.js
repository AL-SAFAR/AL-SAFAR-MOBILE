const mongoose = require("mongoose");

const DriverSchema = mongoose.Schema({
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
  cnic: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1491921125492-f0b9c835b699?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
  vehicle: {
    carType: {
      type: String,
      default: "Car",
    },
    model: {
      type: String,
    },
    plateNumber: {
      type: String,
      // required: true,
      unique: true,
    },
    licenseNumber: {
      type: String,
      // required: true,
      unique: true,
    },
    color: {
      type: String,
    },
  },
  city: {
    type: String,
    // required: true
  },
  starRating: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("driver", DriverSchema);
