import {
  GET_CURRENT_LOCATION,
  GET_DRIVER_INFORMATION,
  UPDATE_DRIVER_LOCATION,
  GET_DRIVER_LOCATION,
  GET_DISTANCE_FROM_DRIVER,
  TRANSPORT_ERROR,
} from "./types";
import { Dimensions } from "react-native";
// import MapViewDirections from "react-native-maps-directions";
import { DISTANCE_DIRECTION_KEY, BASE_URL } from "../../../key.json";
import store from "../../../store";
// import request from "../../../util/request";
import axios from "axios";
import { getDistance } from "geolib";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//Get USERS current location
export const getCurrentLocation = () => async (dispatch) => {
  try {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        dispatch({
          type: GET_CURRENT_LOCATION,
          payload: region,
        });
        // console.log(region);
      },
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: TRANSPORT_ERROR,
      payload: err.response.data,
    });
  }
};

//Get Driver's Info
export const getDriverInfo = () => async (dispatch) => {
  let id = store.getState().transport.booking.driverId;
  axios
    .get(`${BASE_URL}/driver/driver/` + id)
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: GET_DRIVER_INFORMATION,
        payload: res.data,
      });
    })
    .catch(function (error) {
      dispatch({
        type: TRANSPORT_ERROR,
        payload: error,
      });
    });
};

//Get Intial driver location
export const getDriverLocation = () => async (dispatch) => {
  let id = store.getState().transport.booking.driverId;
  axios
    .get(`${BASE_URL}/driver/driverLocationSocket/` + id)
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: GET_DRIVER_LOCATION,
        payload: res.data,
      });
    })
    .catch(function (error) {
      dispatch({
        type: TRANSPORT_ERROR,
        payload: error,
      });
    });
};

//Get distance from driver
export const getDistanceFromDriver = (durationDistance) => async (dispatch) => {
  dispatch({
    type: GET_DISTANCE_FROM_DRIVER,
    payload: durationDistance,
  });

  // axios
  //   .get(`${BASE_URL}/driver/driverLocationSocket/` + id)
  //   .then((res) => {
  //     // console.log(res.data);
  //     dispatch({
  //       type: GET_DRIVER_LOCATION,
  //       payload: res.data,
  //     });
  //   })
  //   .catch(function (error) {
  //     dispatch({
  //       type: TRANSPORT_ERROR,
  //       payload: error,
  //     });
  //   });
};
