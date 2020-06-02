import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./src/screens/reducers";
import creatSocketIoMiddleware from "redux-socket.io";
// import io from "socket.io-client";
import { HOME_BASE_URL } from "./key.json";
const io = require("socket.io-client");
let socket = io(HOME_BASE_URL, {
  transports: ["websocket"],
});

// let socket = io(`${HOME_BASE_URL}`, { jsonp: false });
let socketIoMiddleware = creatSocketIoMiddleware(socket, "server/");
const initialState = {};

const middleware = [thunk, socketIoMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
