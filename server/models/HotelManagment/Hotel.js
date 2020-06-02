const mongoose = require("mongoose");

const HotelSchema = mongoose.Schema({
  hotelRep: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotelRep",
    unique: true
  },
  hotelName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  hotelImages: {
    type: [String]
  },
  starRating: {
    type: Number,
    default: 0
  },
  extras: {
    foods: {
      type: [String],
      default: undefined
    },
    facilities: {
      Activities: {
        type: [String],
        default: undefined
      },
      Cleaning: {
        type: [String],
        default: undefined
      },
      general: {
        type: [String],
        default: undefined
      }
    },
    wifi: {
      type: Boolean,
      default: false
    },
    parking: {
      type: Boolean,
      default: false
    }
  },
  houseRules: {
    checkIn: {
      type: String,
      required: true
    },
    checkOut: {
      type: String,
      required: true
    },
    Smoking: {
      type: Boolean,
      default: false
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("hotel", HotelSchema);
