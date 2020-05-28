import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./src/screens/reducers";
import creatSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import { BASE_URL } from "./key.json";

let socket = io(`${BASE_URL}`, { jsonp: false });
let socketIoMiddleware = creatSocketIoMiddleware(socket, "server/");
const initialState = {};

const middleware = [thunk, socketIoMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
