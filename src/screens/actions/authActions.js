import axios from "axios";
// import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  SET_RECOM,
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

export const register = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("register");

  const body = { name, email, password };

  let response = await axios
    .post(`${BASE_URL}/users/`, body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
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
//EditProfile
export const editProfile = (formbody) => async (dispatch) => {
  let token = await AsyncStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  let { name, email, cnic, mobile, Image } = formbody;
  const CustomerFields = {};

  if (name) CustomerFields.name = name;
  if (email) CustomerFields.email = email;
  if (cnic) CustomerFields.cnic = cnic;
  if (mobile) CustomerFields.mobile = mobile;
  if (Image) CustomerFields.Image = Image;

  // try {
  // console.log("hello");
  let response = await axios
    .post(`${BASE_URL}/users/updateProfile`, CustomerFields, config)
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
};

// Logout / Clear Profile
export const logout = () => async (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });
  console.log("loging out");
  dispatch({ type: LOGOUT });
  return true;
};

///recommendation
export const getRecommendation = (formbody) => async (dispatch) => {
  let token = await AsyncStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      // "x-auth-token": token,
    },
  };

  // try {
  // console.log("hello");
  let response = await axios
    .post(`${BASE_URL}/recom/`, formbody, config)
    .then((res) => {
      // console.log(res.data);
      let recomHotel, recomGuide;
      let recom = {};
      if (res.data.hotels) {
        recomHotel = getScore(res.data.hotels.length);
        recom.hotel = res.data.hotels[recomHotel];
      }
      // console.log(recomHotel);
      if (res.data.guides) {
        recomGuide = getScore(res.data.guides.length);
        recom.guide = res.data.guides[recomGuide];
      }
      // console.log(recomGuide);
      // console.log(recom);
      dispatch({
        type: SET_RECOM,
        payload: recom,
      });
      // console.log(res.data);
      // dispatch(loadUser());
      // return true;
    })
    .catch((err) => {
      console.log(err);

      // return false;
    });
  // return response;
};
function getScore(max) {
  min = Math.ceil(0);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
