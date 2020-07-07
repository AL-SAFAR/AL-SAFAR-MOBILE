const mongoose = require("mongoose");

const AgentBookingSchema = mongoose.Schema({
  agentProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "agentProfile",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment",
  },

  HotelBooking: {
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotel",
    },
    HotelRepId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotelRep",
    },
    reserveRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
    },
    HotelRepEmail: {
      type: String,
    },
    reserveFromDate: {
      type: Date,
    },
    reserveToDate: {
      type: Date,
    },
    reserveAdult: {
      type: Number,
    },
    reserveChildren: {
      type: Number,
    },
    reserveRoom: {
      type: Number,
    },
  },
  GuideBooking: {
    GuideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guide",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    email: {
      type: String,
    },
  },
  status: {
    type: String,
    default: "active",
  },
  cancelDate: {
    type: Date,
  },
  starRating: {
    type: Number,
  },
  feedback: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("agentBooking", AgentBookingSchema);
