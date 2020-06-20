import {
  GET_GUIDES,
  SET_LOADING,
  GUIDES_ERROR,
  GUIDE_BOOKING_CONFIRMED,
} from "../actions/types";

const initialState = {
  guides: null,
  loading: false,
  error: null,
  guideBookingConfirmed: false,
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
    case GUIDES_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case GUIDE_BOOKING_CONFIRMED:
      // console.error(action.payload);
      return {
        ...state,
        guideBookingConfirmed: action.payload,
      };
    default:
      return state;
  }
};
