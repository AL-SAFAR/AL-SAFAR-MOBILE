import { combineReducers } from "redux";
// import auth from "./auth";
import guideReducer from "./guideReducer";
import hotelReducer from "./hotelReducer";
export default combineReducers({
  guide: guideReducer,
  hotel: hotelReducer
});
