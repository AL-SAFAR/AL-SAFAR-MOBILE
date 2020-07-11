import {
  GET_AGENTS,
  SET_LOADING,
  AGENT_ERROR,
  GET_AGENT_BOOOKINGS,
} from "../actions/types";

const initialState = {
  agents: null,
  loading: false,
  error: null,
  agentBookings: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENTS:
      return {
        ...state,
        agents: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_AGENT_BOOOKINGS:
      return {
        ...state,
        agentBookings: action.payload,
      };
    case AGENT_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
