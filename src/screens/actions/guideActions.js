import { GET_GUIDES, SET_LOADING, GUIDES_ERROR } from "./types";

//Get techs from server
export const getGuides = () => async dispatch => {
  try {
    setLoading();

    const res = await fetch("/guide");
    const data = await res.json();

    dispatch({
      type: GET_GUIDES,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: GUIDES_ERROR,
      payload: err.response.statusText
    });
  }
};
