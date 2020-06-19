const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  SPEmail: {
    type: String,
    default: "",
  },
  typeOfSP: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    default: "",
  },
  commission: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("payment", PaymentSchema);
