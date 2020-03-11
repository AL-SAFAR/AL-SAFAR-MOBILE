import {
    GET_SELECTED_ADDRESS,
    GET_INPUT,
    GET_ADDRESS_PREDICTIONS,
    GET_DISTANCE_MATRIX,
    TOGGLE_SEARCH_RESULT,
    GET_CURRENT_LOCATION,
    SET_LOADING,
    TRANSPORT_ERROR, SEARCH_HOTELS
} from "./types";
import { Dimensions } from 'react-native'
import { DISTANCE_KEY, BASE_URL } from '../../../key.json'
import store from "../../../store"
import request from "../../../util/request";
import axios from "axios";
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//Get USERS current location
export const getCurrentLocation = () => async dispatch => {
    try {
        navigator.geolocation.getCurrentPosition(position => {
            const region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
            dispatch({
                type: GET_CURRENT_LOCATION,
                payload: region
            });

        }, (err) => console.log(err),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    } catch (err) {
        console.log(err.response.data)
        dispatch({
            type: TRANSPORT_ERROR,
            payload: err.response.data
        });
    }
};
// Getuser location input 
export const getInputData = payload => async dispatch => {
    try {
        const { key, value } = payload
        const input = {
            [key]: value
        }
        dispatch({
            type: GET_INPUT,
            payload: input
        });
    } catch (err) {
        dispatch({
            type: TRANSPORT_ERROR,
            payload: err
        });
    }
};

//toggle search results modal
export const toggleSearchResultmodal = payload => async dispatch => {
    try {
        let results = {}
        if (payload === "pickUp") {
            results = {
                pickUp: true,
                dropOff: false

            }
        } else if (payload === "dropOff") {
            results = {
                pickUp: false,
                dropOff: true

            }
        }
        dispatch({
            type: TOGGLE_SEARCH_RESULT,
            payload: results
        });
    } catch (err) {
        dispatch({
            type: TRANSPORT_ERROR,
            payload: err
        });
    }
};

//get address from google places
export const getAddressPredictions = (locations) => async dispatch => {
    try {
        dispatch({
            type: GET_ADDRESS_PREDICTIONS,
            payload: locations
            // console.log(locations)
        })
    } catch (err) {
        dispatch({
            type: TRANSPORT_ERROR,
            payload: err
        });
    }
};

//get selected address
export const getSelectedAddress = (payload) => async dispatch => {
    try {
        // console.log(payload)
        dispatch({
            type: GET_SELECTED_ADDRESS,
            payload: payload
        })
        // .then(() => {
        const { selectedAddress } = store.getState().transport
        console.log(selectedAddress.selectedDropOff)
        console.log(selectedAddress.selectedPickUp)

        // console.log("DropOff:" + selectedAddress.selectedDropOff.formatted_address)

        const { lat, lng } = payload.geometry.location;
        if (selectedAddress.selectedPickUp && selectedAddress.selectedDropOff) {

            request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
                .query({
                    origins: selectedAddress.selectedPickUp.geometry.location.lat + "," + selectedAddress.selectedPickUp.geometry.location.lng,
                    destinations: selectedAddress.selectedDropOff.geometry.location.lat + "," + selectedAddress.selectedDropOff.geometry.location.lng,
                    mode: "driving",
                    key: DISTANCE_KEY
                })
                .finish((error, res) => {
                    console.log(res)
                    console.log(error);
                    // dispatch({
                    //     type: GET_DISTANCE_MATRIX,
                    //     payload: res.body
                    // });
                })
        }
    } catch (err) {
        dispatch({
            type: TRANSPORT_ERROR,
            payload: err
        });
    }
};


//set laoding true
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};
