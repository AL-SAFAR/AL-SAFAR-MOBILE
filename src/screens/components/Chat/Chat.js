import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";
import { openChat, sendMessage } from "../../actions/chatActions";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";

const Chat = ({ navigation, chat: { messages } }) => {
  //   const [send, setSend] = useState();
  let user = null;
  let userId = null;
  const receiver = navigation.getParam("receivingUser");
  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      user = JSON.parse(res);
      userId = user._id;
      openChat({ user: userId, receiver: receiver });
      console.log(res);
    });
  }, []);

  const send = (message) => {
    sendMessage(message.text, userId, receiver);
  };

  return (
    <GiftedChat
      messages={messages}
      user={{
        _id: userId,
      }}
      onSend={(message) => send(message[0])}
      //   messages={messages}
      //   onSend={(message) => send(message)}
      //   user={{
      //     _id: 1,
      //   }}
    />
  );
};

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  openChat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  chat: state.chat,
  //   receiver: navigation.getParam("receivingUser"),
});

// export default connect(mapState)(Chat);
export default connect(mapStateToProps, { sendMessage, openChat })(Chat);
