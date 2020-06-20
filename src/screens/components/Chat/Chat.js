import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";
import { openChat, sendMessage, clearChat } from "../../actions/chatActions";
import { globalStyles } from "../../../../styles/global";
import PropTypes from "prop-types";
import store from "../../../../store";
import {
  Platform,
  View,
  SafeAreaView,
  AsyncStorage,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Chat = ({ navigation, chat: { messages } }) => {
  // const [userId, setuserId] = useState(null);
  //   const [send, setSend] = useState();
  // let user = null;
  // let userId = null;
  const reciever = navigation.getParam("receivingUser");
  const user = navigation.getParam("user");
  useEffect(() => {
    // AsyncStorage.getItem("user").then((res) => {
    //   let tempuser = JSON.parse(res);
    //   // console.log(tempuser);
    //   setUser({ _id: res._id, name: res.name });
    // setuserId(tempuser._id);
    // console.log(user);
    openChat({ sender: user._id, reciever: reciever });
    // console.log(res);
    // });
  }, []);

  const send = (message) => {
    // console.log(userId);
    sendMessage(message.text, user, reciever);
    Keyboard.dismiss();
  };
  const clearTheChat = async () => {
    // clearChat(navigatio/n);
    store.dispatch({ type: "CLEAR_CHAT" });
    navigation.goBack();
  };
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.titleBar}>
        <TouchableOpacity
          onPress={() => {
            clearTheChat();
          }}
        >
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
        user={{ user }}
        onSend={(message) => send(message[0])}
      />
      {/* {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />} */}
    </SafeAreaView>
  );
};

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  openChat: PropTypes.func.isRequired,
  clearChat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  chat: state.chat,
  //   receiver: navigation.getParam("receivingUser"),
});

// export default connect(mapState)(Chat);
export default connect(mapStateToProps, { sendMessage, openChat, clearChat })(
  Chat
);
