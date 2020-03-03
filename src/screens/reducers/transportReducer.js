import {
    GET_CURRENT_LOCATION,
    TRANSPORT_ERROR,
    SET_LOADING,
    GET_INPUT,
    GET_ADDRESS_PREDICTIONS,
    TOGGLE_SEARCH_RESULT,
} from "../actions/types";

// import { GET_HOTELS } from "../actions/types";

const initialState = {
    region: {},
    inputData: {},
    resultType: {},
    predictions: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_LOCATION:
            return {
                ...state,
                region: action.payload,
                loading: false
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
                predictions: []
                // loading: false
            };
        case GET_ADDRESS_PREDICTIONS:
            // console.log(action.payload)
            return {
                ...state,
                predictions: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case TRANSPORT_ERROR:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
