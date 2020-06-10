import { GET_HOTELS, SET_LOADING, HOTELS_ERROR, SEARCH_HOTELS } from "./types";
import { BASE_URL } from "../../../key.json";
//Get hotels from server
export const getHotels = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`${BASE_URL}/users/viewHotels`, {
      // const res = await fetch(`${BASE_URL}hotels`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.log(err);
    });
    let data = await res.json();
    dispatch({
      type: GET_HOTELS,
      payload: data,
    });
  } catch (err) {
    // console.log(err)
    dispatch({
      type: HOTELS_ERROR,
      payload: err.response.data,
    });
  }
};
// Search Hotels
export const searchHotels = (text) => async (dispatch) => {
  try {
    setLoading();
    // console.log(text);
    text = text.toLowerCase();
    const res = await fetch(`${BASE_URL}/hotels?city_like=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_HOTELS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: HOTELS_ERROR,
      payload: err,
    });
  }
};

//set laoding true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
