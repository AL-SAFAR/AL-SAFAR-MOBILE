import {
  GET_HOTELS,
  HOTELS_ERROR,
  SET_LOADING,
  // SEARCH_HOTELS,
  GET_HOTEL_BOOKINGS,
  FILTER_HOTELS,
  CLEAR_FILTER,
} from "../actions/types";

// import { GET_HOTELS } from "../actions/types";

const initialState = {
  hotels: null,
  loading: false,
  error: null,
  hotelBookings: null,
  filtered: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HOTELS:
      return {
        ...state,
        hotels: action.payload,
        loading: false,
      };
    // case SEARCH_HOTELS:
    //   return {
    //     ...state,
    //     hotels: action.payload,
    //   };
    case FILTER_HOTELS:
      return {
        ...state,
        filtered: state.hotels.filter((hotel) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return hotel.city.match(regex) || hotel.hotelName.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_HOTEL_BOOKINGS:
      return {
        ...state,
        hotelBookings: action.payload,
      };

    case HOTELS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
