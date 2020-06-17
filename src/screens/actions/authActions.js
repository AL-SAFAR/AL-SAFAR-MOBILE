import axios from "axios";
// import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { BASE_URL } from "../../../key.json";
import store from "../../../store";
import setAuthToken from "../utils/setAuthToken";
import { AsyncStorage } from "react-native";
// Load User
export const loadUser = () => async (dispatch) => {
  let token = await AsyncStorage.getItem("token");
  // console.log(token);
  // if (AsyncStorage.getItem("token")) {
  //   setAuthToken(AsyncStorage.getItem("token"));
  // }
  // AsyncStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  // console.log(token);
  // try {
  await axios
    .get(`${BASE_URL}/auth`, config)
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      // // console.log(res.data);
      // if (user) {
      //   return true;
      //   // console.log("hello user");
      // } else {
      //   return false;
      // }
    })
    .catch((err) => {
      console.log(err);
    });
  // } catch (err) {
  //   dispatch({
  //     type: AUTH_ERROR,
  //   });
  // }
};
// Register User

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    console.log(res.data);
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, setAler"danger")));
    // }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const test = () => {
  console.log("hello");
};
// Login User
export const loginuser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const type = "0";
  const body = { email, password, type };

  // try {
  // console.log("hello");
  let response = await axios
    .post(`${BASE_URL}/auth`, body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      // console.log(res.data);
      dispatch(loadUser());
      return true;
    })
    .catch((err) => {
      console.log(err.response.data.msg);

      return false;
    });
  return response;
  // // return true;
  // if (res.data) {
  //   return true;
  // }
  // } catch (err) {
  //   const errors = err.response.data.errors;

  //   if (errors) {
  //     errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  //   }

  //   dispatch({
  //     type: LOGIN_FAIL,
  //   });
  // }
};

// Logout / Clear Profile
export const logout = () => async (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });
  console.log("loging out");
  dispatch({ type: LOGOUT });
  return true;
};
