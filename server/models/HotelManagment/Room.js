const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const RoomSchema = mongoose.Schema({
  roomID: {
    type: Number
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotel"
  },
  roomType: {
    type: String,
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  roomMaxOccupancy: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  NoOfRooms: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

autoIncrement.initialize(mongoose.connection);
RoomSchema.plugin(autoIncrement.plugin, { model: "room", field: "roomId" });
module.exports = mongoose.model("room", RoomSchema);
