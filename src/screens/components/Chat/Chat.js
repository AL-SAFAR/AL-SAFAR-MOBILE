import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";
import { openChat, sendMessage } from "../../actions/chatActions";
import PropTypes from "prop-types";
import { AsyncStorage, Keyboard, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Chat = ({ navigation, chat: { messages } }) => {
  const [userId, setuserId] = useState(null);
  const [user, setUser] = useState(null);
  //   const [send, setSend] = useState();
  // let user = null;
  // let userId = null;
  const reciever = navigation.getParam("receivingUser");
  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      let tempuser = JSON.parse(res);
      // console.log(tempuser);
      setUser({ _id: res._id, name: res.name });
      setuserId(tempuser._id);

      openChat({ sender: tempuser._id, reciever: reciever });
      // console.log(res);
    });
  }, []);

  const send = (message) => {
    // console.log(userId);
    sendMessage(message.text, userId, reciever);
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={globalStyles.titleBar}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <View>
            <Ionicons
              name="ios-arrow-back"
              size={24}
              color="#52575D"
            ></Ionicons>
          </View>
        </TouchableOpacity>
        <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
      </View>
      <GiftedChat
        messages={messages}
        user={{
          _id: user.id,
          // name: user.name,
        }}
        onSend={(message) => send(message[0])}
      />
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </View>
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
