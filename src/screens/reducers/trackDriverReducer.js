import {
  GET_CURRENT_LOCATION,
  GET_DRIVER_INFORMATION,
  UPDATE_DRIVER_LOCATION,
  GET_DRIVER_LOCATION,
  GET_DISTANCE_FROM_DRIVER,
  TRANSPORT_ERROR,
} from "../actions/types";

// import { GET_HOTELS } from "../actions/types";

const initialState = {
  region: {},
  driverInfo: {},
  driverLocation: {},
  showDriverFound: true,
  showCarMarker: false,
  distanceFromDriver: {},
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_LOCATION:
      return {
        ...state,
        region: action.payload,
      };
    case GET_DRIVER_INFORMATION:
      return {
        ...state,
        driverInfo: action.payload,
      };

    case UPDATE_DRIVER_LOCATION:
      return {
        ...state,
        driverLocation: action.payload,
      };
    case GET_DRIVER_LOCATION:
      return {
        ...state,
        driverLocation: action.payload,
        showDriverFound: false,
        showCarMarker: true,
      };
    case GET_DISTANCE_FROM_DRIVER:
      // console.log(action.payload);
      return {
        ...state,
        distanceFromDriver: action.payload,
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
