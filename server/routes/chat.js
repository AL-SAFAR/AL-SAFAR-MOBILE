const Conversation = require("../models/Conversation/Conversation");
const Message = require("../models/Conversation/Message");

const findOrCreateConversation = async (sender, reciever) => {
  try {
    let conversation = await Conversation.findOne({
      customerId: sender,
      SPID: reciever,
    });

    if (conversation) {
      return conversation;
    }

    conversation = new Conversation({
      customerId: sender,
      SPID: reciever,
    });

    await conversation.save();
    return "convo created";
  } catch (err) {
    console.log(err);
  }
};

const addMessage = async (text, sender, reciever, type) => {
  try {
    // const conversation = await Conversation.find({
    //   customerId: sender,
    //   SPID: reciever,
    // });
    if (type == "0") {
      const conversation = await Conversation.findOneAndUpdate(
        {
          customerId: sender,
          SPID: reciever,
        },
        { $push: { messages: { user: sender, text } } }
      );
      if (!conversation) {
        return "Convo not found";
      }
      let convo = await Conversation.findOne({
        customerId: sender,
        SPID: reciever,
      });
      return convo;
    } else if (type == "1") {
      const conversation = await Conversation.findOneAndUpdate(
        {
          customerId: reciever,
          SPID: sender,
        },
        { $push: { messages: { user: sender, text } } }
      );
      if (!conversation) {
        return "Convo not found";
      }
      let convo = await Conversation.findOne({
        customerId: reciever,
        SPID: sender,
      });
      return convo;
    }

    // console.log(conversation);
    // conversation.messages.push({
    //   user: sender,
    //   text,
    // });

    // conversation.populate('messages.user', ['name', 'avatar'], (err, res) => {
    //   if (err) throw err;
    //   return res;
    // });

    // await conversation.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addMessage, findOrCreateConversation };
