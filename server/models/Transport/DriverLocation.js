const mongoose = require("mongoose");

const DriverLocationSchema = mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "driver",
    unique: true,
  },
  coordinate: {
    type: { type: String },
    coordinates: [],
  },
  socketId: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
DriverLocationSchema.index({ coordinate: "2dsphere" });
module.exports = mongoose.model("driverLocation", DriverLocationSchema);
