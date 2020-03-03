import { GET_INPUT, GET_ADDRESS_PREDICTIONS, TOGGLE_SEARCH_RESULT, GET_CURRENT_LOCATION, SET_LOADING, TRANSPORT_ERROR, SEARCH_HOTELS } from "./types";
import { Dimensions } from 'react-native'
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
        // console.log(locations)
        dispatch({
            type: GET_ADDRESS_PREDICTIONS,
            payload: locations
        })
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
