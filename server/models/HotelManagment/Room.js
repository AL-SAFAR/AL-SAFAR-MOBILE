const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const RoomSchema = mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotel",
  },
  roomType: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  roomMaxOccupancy: {
    type: Number,
    required: true,
  },

  NoOfRooms: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("room", RoomSchema);
