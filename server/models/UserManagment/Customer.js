const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  Image: {
    type: String,
  },
});

module.exports = mongoose.model("customer", CustomerSchema);
