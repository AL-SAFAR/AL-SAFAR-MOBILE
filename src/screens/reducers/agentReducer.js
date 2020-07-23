import {
  GET_AGENTS,
  SET_LOADING,
  AGENT_ERROR,
  GET_AGENT_BOOOKINGS,
  FILTER_AGENTS,
  CLEAR_FILTER,
} from "../actions/types";

const initialState = {
  agents: null,
  loading: false,
  error: null,
  agentBookings: null,
  filtered: null,
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
    case FILTER_AGENTS:
      return {
        ...state,
        filtered: state.agents.filter((agent) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            agent.AgencyLocation.match(regex) || agent.AgencyName.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
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
