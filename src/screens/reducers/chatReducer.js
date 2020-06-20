import { GOT_MESSAGES, GOT_NEW_MESSAGE, CLEAR_CHAT } from "../actions/types";

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case GOT_MESSAGES:
      // console.log(action.payload);
      let msg = action.payload.messages
        ? action.payload.messages.reverse()
        : [];
      // console.log(msg);
      return {
        messages: msg,
      };
    case GOT_NEW_MESSAGE:
      // co nsole.log("sample");
      msg = action.payload.messages.reverse();
      return {
        messages: msg,
      };
    case CLEAR_CHAT:
      return {
        messages: [],
      };
    // return [action.message, ...state];
    default:
      return state;
  }
};
