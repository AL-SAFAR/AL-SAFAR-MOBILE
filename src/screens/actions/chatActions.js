import axios from "axios";
// import { setAlert } from "./alert";
import { GOT_MESSAGES, GOT_NEW_MESSAGE } from "./types";
import { BASE_URL } from "../../../key.json";
import store from "../../../store";
import setAuthToken from "../utils/setAuthToken";
import { AsyncStorage } from "react-native";

export const openChat = (users) => {
  console.log(users);
  //   socket.emit("chat", users);
};

export const sendMessage = (text, sender, receiver) => {
  console.log("Text: " + text);
  console.log(sender);
  console.log("Reciever: " + receiver);
  //   socket.emit("message", { text, sender, receiver });
};
