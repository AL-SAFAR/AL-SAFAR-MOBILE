import { GOT_MESSAGES, GOT_NEW_MESSAGE } from "../actions/types";

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case GOT_MESSAGES:
      console.log(action.payload);
      return {
        messages: action.payload.messages,
      };
    case GOT_NEW_MESSAGE:
      console.log("sample");
      return {
        messages: action.payload.messages,
      };
    // return [action.message, ...state];
    default:
      return state;
  }
};
