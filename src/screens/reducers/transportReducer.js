import {
  GET_CURRENT_LOCATION,
  TRANSPORT_ERROR,
  SET_LOADING,
  GET_INPUT,
  GET_DISTANCE_MATRIX,
  GET_ADDRESS_PREDICTIONS,
  TOGGLE_SEARCH_RESULT,
  CALCULATE_FARE,
  GET_SELECTED_ADDRESS,
  UPDATE_CAR,
  GET_CAR_BOOKINGS,
  BOOK_CAR,
  BOOKING_CONFIRMED,
  CLEAR_STATE,
  GET_NEARBY_DRIVERS,
} from "../actions/types";

// import { GET_HOTELS } from "../actions/types";

const initialState = {
  region: {},
  inputData: {},
  resultType: {},
  carType: "Car",
  predictions: [],
  selectedAddress: {},
  distanceMatrix: {},
  fare: 0,
  distance: 0,
  booking: {},
  loading: false,
  error: null,
  carBookings: null,
  nearByDrivers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_LOCATION:
      return {
        ...state,
        region: action.payload,
        loading: false,
      };
    case GET_INPUT:
      return {
        ...state,
        inputData: action.payload,
        // loading: false
      };
    case TOGGLE_SEARCH_RESULT:
      return {
        ...state,
        resultType: action.payload,
        predictions: [],
        // loading: false
      };
    case GET_ADDRESS_PREDICTIONS:
      // console.log(action.payload)
      return {
        ...state,
        predictions: action.payload,
      };
    case GET_SELECTED_ADDRESS:
      let selectedTitle = state.resultType.pickUp
        ? "selectedPickUp"
        : "selectedDropOff";
      return {
        ...state,
        selectedAddress: {
          ...state.selectedAddress,
          [selectedTitle]: action.payload,
        },
        resultType: {
          pickUp: false,
          dropOff: false,
        },
      };
    case GET_DISTANCE_MATRIX:
      return {
        ...state,
        distanceMatrix: action.payload,
      };
    case UPDATE_CAR:
      return {
        ...state,
        carType: action.payload,
      };
    case CALCULATE_FARE:
      return {
        ...state,
        fare: action.payload.fare,
        distance: action.payload.distance,
        predictions: [],
      };
    case GET_NEARBY_DRIVERS:
      return {
        ...state,
        nearByDrivers: action.payload,
      };
    case BOOK_CAR:
      return {
        ...state,
        booking: action.payload,
      };

    case BOOKING_CONFIRMED:
      console.log(action.payload);
      return {
        ...state,
        booking: action.payload,
      };

    case GET_CAR_BOOKINGS:
      console.log(action.payload);
      return {
        ...state,
        carBookings: action.payload,
      };

    case CLEAR_STATE:
      // console.log(action.payload);
      return {
        ...state,
        inputData: {},
        resultType: {},
        carType: "Car",
        predictions: [],
        selectedAddress: {},
        distanceMatrix: {},
        fare: 0,
        booking: {},
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TRANSPORT_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
