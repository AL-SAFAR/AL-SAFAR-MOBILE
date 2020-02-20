import {
  GET_HOTELS,
  HOTELS_ERROR,
  SET_LOADING,
  SEARCH_HOTELS
} from "../actions/types";

// import { GET_HOTELS } from "../actions/types";

const initialState = {
  hotels: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HOTELS:
      return {
        ...state,
        hotels: action.payload,
        loading: false
      };
    case SEARCH_HOTELS:
      return {
        ...state,
        hotels: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case HOTELS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
