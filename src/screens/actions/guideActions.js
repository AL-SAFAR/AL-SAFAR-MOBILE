import { GET_GUIDES, SET_LOADING, GUIDES_ERROR } from "./types";
import { BASE_URL } from "../../../key.json";

//Get techs from server
export const getGuides = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`${BASE_URL}/guides`);
    const data = await res.json();
    dispatch({
      type: GET_GUIDES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: GUIDES_ERROR,
    //   payload: err.response.s,
    // });
  }
};

//set laoding true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
