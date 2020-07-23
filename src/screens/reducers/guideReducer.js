import {
  GET_GUIDES,
  SET_LOADING,
  GUIDES_ERROR,
  GET_GUIDE_BOOKINGS,
  FILTER_GUIDES,
  CLEAR_FILTER,
} from "../actions/types";

const initialState = {
  guides: null,
  loading: false,
  error: null,
  filtered: null,
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
    case FILTER_GUIDES:
      return {
        ...state,
        filtered: state.guides.filter((guide) => {
          // console.log(guide);
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            guide.UserProfile[0].city.match(regex) || guide.name.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
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
