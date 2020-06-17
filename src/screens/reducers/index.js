import { combineReducers } from "redux";
// import auth from "./auth";
import guideReducer from "./guideReducer";
import hotelReducer from "./hotelReducer";
import transportReducer from "./transportReducer";
import trackDriverReducer from "./trackDriverReducer";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
export default combineReducers({
  guide: guideReducer,
  hotel: hotelReducer,
  transport: transportReducer,
  trackDriver: trackDriverReducer,
  auth: authReducer,
  chat: chatReducer,
});
