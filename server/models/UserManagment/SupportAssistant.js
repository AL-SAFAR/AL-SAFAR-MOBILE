const mongoose = require("mongoose");

const SupportAssistantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true
  },
  cnic: {
    type: String,
    required: true
  },
  agentID: {
    type: String,
    // required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("supportAssistant", SupportAssistantSchema);
