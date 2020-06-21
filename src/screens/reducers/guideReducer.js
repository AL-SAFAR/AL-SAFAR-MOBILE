import {
  GET_GUIDES,
  SET_LOADING,
  GUIDES_ERROR,
  GET_GUIDE_BOOKINGS,
} from "../actions/types";

const initialState = {
  guides: null,
  loading: false,
  error: null,
  guideBookings: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GUIDES:
      return {
        ...state,
        guides: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_GUIDE_BOOKINGS:
      return {
        ...state,
        guideBookings: action.payload,
      };
    case GUIDES_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
