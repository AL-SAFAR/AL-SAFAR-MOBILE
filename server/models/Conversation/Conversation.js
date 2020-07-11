const mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
  SPID: {
    type: String,
    required: true,
  },
  messages: [
    {
      user: {
        _id: {
          type: String,
        },
        name: {
          type: String,
        },
      },
      text: {
        type: String,
        // required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      avatar: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1491921125492-f0b9c835b699?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
      },
    },
  ],
});

module.exports = Conversation = mongoose.model(
  "conversation",
  ConversationSchema
);
