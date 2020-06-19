import {
  GET_SELECTED_ADDRESS,
  GET_INPUT,
  GET_ADDRESS_PREDICTIONS,
  GET_DISTANCE_MATRIX,
  TOGGLE_SEARCH_RESULT,
  GET_CURRENT_LOCATION,
  SET_LOADING,
  TRANSPORT_ERROR,
  SEARCH_HOTELS,
  UPDATE_CAR,
  BOOK_CAR,
  BOOKING_CONFIRMED,
  GET_NEARBY_DRIVERS,
  CLEAR_STATE,
  CALCULATE_FARE,
} from "./types";
import { AsyncStorage, Dimensions } from "react-native";

import { DISTANCE_DIRECTION_KEY, BASE_URL } from "../../../key.json";
import store from "../../../store";
import request from "../../../util/request";
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

// Getuser location input
export const getInputData = (payload) => async (dispatch) => {
  try {
    const { key, value } = payload;
    const input = {
      [key]: value,
    };
    dispatch({
      type: GET_INPUT,
      payload: input,
    });
  } catch (err) {
    dispatch({
      type: TRANSPORT_ERROR,
      payload: err,
    });
  }
};

//toggle search results modal
export const toggleSearchResultmodal = (payload) => async (dispatch) => {
  try {
    let results = {};
    if (payload === "pickUp") {
      results = {
        pickUp: true,
        dropOff: false,
      };
    } else if (payload === "dropOff") {
      results = {
        pickUp: false,
        dropOff: true,
      };
    }
    dispatch({
      type: TOGGLE_SEARCH_RESULT,
      payload: results,
    });
  } catch (err) {
    dispatch({
      type: TRANSPORT_ERROR,
      payload: err,
    });
  }
};

//get address from google places
export const getAddressPredictions = (locations) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ADDRESS_PREDICTIONS,
      payload: locations,
      // console.log(locations)
    });
  } catch (err) {
    dispatch({
      type: TRANSPORT_ERROR,
      payload: err,
    });
  }
};

//get selected address
export const getSelectedAddress = (payload) => async (dispatch) => {
  try {
    // console.log(payload)
    dispatch({
      type: GET_SELECTED_ADDRESS,
      payload: payload,
    });
    const { selectedAddress } = store.getState().transport;
    // if (selectedAddress.selectedPickUp && selectedAddress.selectedDropOff) {
    //   const pickup = `${selectedAddress.selectedPickUp.geometry.location.lat},${selectedAddress.selectedPickUp.geometry.location.lng}`;
    //   const dropoff = `${selectedAddress.selectedDropOff.geometry.location.lat},${selectedAddress.selectedDropOff.geometry.location.lng}`;
    //   console.log(selectedAddress.selectedPickUp.name);
    //   console.log("++++++++++++++++++++++");
    //   console.log(selectedAddress.selectedDropOff.name);
    //   const DistTime = getDistanceAndTime(pickup, dropoff);
    //   dispatch({
    //     type: GET_DISTANCE_MATRIX,
    //     payload: DistTime,
    //   });
    //   console.log(DistTime);
    // }
  } catch (err) {
    dispatch({
      type: TRANSPORT_ERROR,
      payload: err,
    });
  }
};

//getting distance and time from distance matrix api
const getDistanceAndTime = async (BaseLocation, TargetLocation) => {
  // get location of base BaseLocation
  // get locations of targets TargetLocation
  // prepare final API call
  let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";
  let params = `origins=${BaseLocation}&destinations=${TargetLocation}&key=${DISTANCE_DIRECTION_KEY}`;
  let finalApiURL = `${ApiURL}${encodeURI(params)}`;

  // get duration/distance from base to each target
  try {
    let response = await fetch(finalApiURL);
    let responseJson = await response.json();
    // console.log(responseJson);
    return responseJson;
    // output
    //   {
    //     "destination_addresses" : [ "21000 W 10 Mile Rd, Southfield, MI 48075, USA" ],
    //     "origin_addresses" : [ "555 E Lafayette St, Detroit, MI 48226, USA" ],
    //     "rows" : [{
    //           "elements" : [{
    //                 "distance" : {
    //                    "text" : "28.1 km",
    //                    "value" : 28073},
    //                 "duration" : {
    //                    "text" : "23 mins",
    //                    "value" : 1367},
    //                 "status" : "OK"}]}],
    //     "status" : "OK"
    //  }
  } catch (error) {
    console.error(error);
  }
};

//update CarType
export const updateCar = (payload) => async (dispatch) => {
  try {
    // console.log(payload);
    dispatch({
      type: UPDATE_CAR,
      payload: payload,
    });
  } catch (err) {
    dispatch({
      type: TRANSPORT_ERROR,
      payload: err,
    });
  }
};

// calculate Fare
export const calculateFare = (payload) => async (dispatch) => {
  const { distance, duration } = payload;
  // console.log(payload);
  const fareValue = [
    { type: "Car", baseFare: 60, distanceRate: 7.5, timeRate: 4 },
    { type: "Premium", baseFare: 100, distanceRate: 7.5, timeRate: 4 },
    { type: "Jeep", baseFare: 150, distanceRate: 7.5, timeRate: 4 },
    { type: "Bike", baseFare: 40, distanceRate: 7.5, timeRate: 4 },
  ];
  const { carType } = store.getState().transport;
  const fares = fareValue.filter((item) => {
    return item.type === carType;
  });
  const fare = fares[0];
  // console.log(fare);
  const distanceInKm = distance;
  const timeInMin = duration;
  const pricePerKm = fare.distanceRate * distanceInKm;
  // console.log(pricePerKm);
  const pricePerMinute = fare.timeRate * timeInMin;
  // console.log(pricePerMinute);
  const totalFare = Math.ceil(fare.baseFare + pricePerKm + pricePerMinute);

  dispatch({
    type: CALCULATE_FARE,
    payload: totalFare,
  });
};

//BOOK CAR
export const bookCar = () => async (dispatch) => {
  const {
    carType,
    selectedAddress,
    fare,
    nearByDrivers,
  } = store.getState().transport;
  const { selectedPickUp, selectedDropOff } = selectedAddress;
  // console.log(selectedPickUp.formatted_address);
  // const nearByDrivers= store().getState().transport.nearByDrivers
  // const nearByDriver =
  //   nearByDrivers[Math.floor(Math.random() * nearByDrivers.length)];
  let cust = await AsyncStorage.getItem("user");
  cust = JSON.parse(cust);

  const nearByDriver = nearByDrivers[0];
  const payload = {
    customerId: cust._id,
    userName: cust.name,
    pickUp: {
      address: selectedPickUp.formatted_address,
      name: selectedPickUp.name,
      latitude: selectedPickUp.geometry.location.lat,
      longitude: selectedPickUp.geometry.location.lng,
    },
    dropOff: {
      address: selectedDropOff.formatted_address,
      name: selectedDropOff.name,
      latitude: selectedDropOff.geometry.location.lat,
      longitude: selectedDropOff.geometry.location.lng,
    },
    fare,
    isPending: true,
    nearByDriver: {
      socketId: nearByDriver.socketId,
      driverId: nearByDriver.driverId,
      latitude: nearByDriver.coordinate.coordinates[1],
      longitude: nearByDriver.coordinate.coordinates[0],
    },
  };
  axios.post(`${BASE_URL}/driver/carBooking`, payload).then(
    (response) => {
      // console.log(response.data);
      dispatch({
        type: BOOK_CAR,
        payload: response.data,
      });
    },
    (error) => {
      console.log(error);
    }
  );
};

//get nearby drivers
export const getNearByDrivers = () => async (dispatch) => {
  const { region } = store.getState().transport;
  // console.log(region);
  const { latitude, longitude } = region;
  // console.log(region);
  await axios
    .get(
      `${BASE_URL}/driver/driverLocationSocket?lat=` +
        latitude +
        "&lng=" +
        longitude
    )
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: GET_NEARBY_DRIVERS,
        payload: res.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

//CLEAR STATE ON CANCEL
export const clearDriverState = () => async (dispatch) => {
  dispatch({
    type: CLEAR_STATE,
  });
};

//set laoding true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
