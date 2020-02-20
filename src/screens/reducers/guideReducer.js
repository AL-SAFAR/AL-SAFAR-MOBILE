import { GET_GUIDES } from "../actions/types";

const initialState = {
  guides: null,
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GUIDES:
      return {
        ...state,
        guides: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
