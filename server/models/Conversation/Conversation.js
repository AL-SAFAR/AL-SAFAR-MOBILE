const mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  SPID: {
    type: String,
    required: true,
  },
  messages: [
    {
      user: {
        type: String,
      },
      text: {
        type: String,
        // required: true,
      },
    },
  ],
});

module.exports = Conversation = mongoose.model(
  "conversation",
  ConversationSchema
);
