import { combineReducers } from "redux";
// import auth from "./auth";
import guideReducer from "./guideReducer";
import hotelReducer from "./hotelReducer";
import transportReducer from "./transportReducer";

export default combineReducers({
  guide: guideReducer,
  hotel: hotelReducer,
  transport: transportReducer
});
