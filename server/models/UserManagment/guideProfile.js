const mongoose = require("mongoose");

const guideProfileSchema = mongoose.Schema({
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "guide",
    unique: true
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
  serviceCharges: {
    type: Number,
    required: true
  },
  places: [
    {
      placeName: {
        type: String,
        required: true
      },
      placeImage: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("guideProfile", guideProfileSchema);
