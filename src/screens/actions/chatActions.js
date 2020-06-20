import axios from "axios";
// import { setAlert } from "./alert";
import { GOT_MESSAGES, GOT_NEW_MESSAGE, CLEAR_CHAT } from "./types";
import { BASE_URL } from "../../../key.json";
import store from "../../../store";
// import setAuthToken from "../utils/setAuthToken";
// import { AsyncStorage } from "react-native";

export const openChat = (users) => {
  // console.log(users);
  store.dispatch({ type: "server/chat", data: users });
};

export const sendMessage = (text, sender, reciever) => {
  // console.log("Text: " + text);
  // console.log(sender);
  // console.log("Reciever: " + reciever);
  const data = {
    sender,
    reciever,
    text,
    type: "0",
  };
  store.dispatch({ type: "server/message", data });

  // socket.emit("message", { text, sender, receiver });
};
//CLEARCHAT
export const clearChat = (navigation) => async (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });
  // console.log("loging out");
  console.log("clearing");
  dispatch({ type: CLEAR_CHAT });
  return navigation.goBack();
};
