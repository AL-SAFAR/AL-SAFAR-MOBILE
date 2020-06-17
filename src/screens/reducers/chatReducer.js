import { GOT_MESSAGES, GOT_NEW_MESSAGE } from "../actions/types";

const initialState = {
  messages: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GOT_MESSAGES:
      return action.messages ? action.messages : [];
    case GOT_NEW_MESSAGE:
      return [action.message, ...state];
    default:
      return state;
  }
}
