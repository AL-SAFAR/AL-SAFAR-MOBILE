//WIll be defined later
const mongoose = require("mongoose");

const GuideSchema = mongoose.Schema({
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
  starRating: {
    type: Number,
    default: 0,
  },
  Image: {
    type: String,
  },
  connectid: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("guide", GuideSchema);
