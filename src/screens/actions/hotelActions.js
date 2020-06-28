import { GET_HOTELS, SET_LOADING, HOTELS_ERROR, SEARCH_HOTELS } from "./types";
import { BASE_URL, APP_COMMISSION } from "../../../key.json";
import { AsyncStorage } from "react-native";
import moment from "moment";
import StripeClient from "./StripeClient";
import axios from "axios";
const testApiKey = "sk_test_EW9RoFD5mICzwKzurlmRNJL600L0ux2kul";

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
    // console.log(data);
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

//charging customer
export const chargeCustomer = (payload) => async (dispatch) => {
  try {
    let usertoken = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": usertoken,
        "Access-Control-Allow-Origin": "*",
      },
    };
    const { paymentDetails, hotel, room } = payload;
    const { expiry, cvc, number } = paymentDetails;
    let startDate = moment(payload.startDate, "DD-MM-YYYY");
    let endDate = moment(payload.endDate, "DD-MM-YYYY");
    let dateDiff = endDate.diff(startDate, "days");
    // console.log("Start Date:", startDate);
    // console.log("End Date:", endDate);
    // console.log("date Duff::", dateDiff);
    let totolCharges = room.rent * dateDiff;
    // console.log("total charges:", totolCharges);
    let USDamount = totolCharges / 160;
    let PKRamount = totolCharges;
    let Expires = expiry.split("/");
    let exp_month = parseInt(Expires[0]);
    let exp_year = parseInt(Expires[1]);
    console.log("month: " + exp_month + " year: " + exp_year);
    let HotelProfile = hotel;
    // console.log(hotel);
    let stripe = new StripeClient(testApiKey);
    const token = await stripe.tokenizeCard({
      number: number,
      expMonth: exp_month,
      expYear: exp_year,
      cvc: cvc,
    });
    const cardTokenId = token.id;
    console.log(cardTokenId);
    return AsyncStorage.getItem("user").then((res) => {
      let LoggedInUser = JSON.parse(res);
      // console.log(LoggedInUser);
      console.log(LoggedInUser.email);
      let serverResponse = axios
        .post(
          `${BASE_URL}/payment/checkcustomer`,
          { CustomerEmail: LoggedInUser.email },
          config
        )
        .then(async (CustomerExists) => {
          let Customer = null;
          let CustomerID = null;
          // console.log("CHECKED CUSTOMER=");
          // console.log(CustomerExists.data);
          CustomerExists = CustomerExists.data;
          if (CustomerExists.hasOwnProperty("NOTFOUND")) {
            // Create a Customer
            Customer = await axios.post(
              `${BASE_URL}/payment/createCustomer`,
              {
                name: LoggedInUser.name,
                email: LoggedInUser.email,
                description: "Customer" + LoggedInUser.name + "was Created",
              },
              config
            );
            CustomerID = Customer.data;
          } else {
            CustomerID;
            // Customer Exits
            Customer = CustomerExists;
            // console.log("THE CURRENT CUSTOMER=");
            // console.log(Customer.id);
            CustomerID = Customer.id;
          }
          // console.log("CUSTOMERS ID=");
          // console.log(CustomerID);
          // Charge Customer
          const res = await axios.post(
            `${BASE_URL}/payment/charge`,
            {
              TokenID: cardTokenId,
              CustomerID,
              Amount: USDamount,
            },
            config
          );
          // console.log(res.data);
          let TrasactionID = res.data.confirm.id;
          let ComissionPercentage = APP_COMMISSION;
          let Comission = PKRamount * (ComissionPercentage / 100);
          // console.log("GuideProfile=");
          // console.log(GuideProfile);
          let savePaymentData = {
            Comission: Comission,
            TrasactionID: TrasactionID,
            amount: PKRamount,
            Email: HotelProfile.email,
            typeOfSP: "hotel",
          };
          let savePaymentResp = await axios.post(
            `${BASE_URL}/payment/savePayment`,
            savePaymentData,
            config
          );
          // console.log(savePaymentResp);
          let PaymentID = savePaymentResp.data.resp._id;
          // console.log("GuideID: " + GuideProfile._id);
          let BookingData = {
            HotelID: hotel._id,
            PaymentID: PaymentID,
            fromDate: payload.startDate,
            toDate: payload.endDate,
            hotelRep: hotel.HotelRep,
            RoomId: room._id,
            NoOfRooms: noOfRooms,
          };
          let BookingResp = await axios.post(
            `${BASE_URL}/hotelRep/saveHotelBooking`,
            BookingData,
            config
          );
          console.log(BookingResp);
          return true;
        })
        .catch((error) => {
          console.error(error);
          return false;
        });
      return serverResponse;
    });
  } catch (error) {
    console.log("Error Occured");
    console.log(error);
  }
};

//check room availability
export const checkAvailability = (data) => async (dispatch) => {
  try {
    let usertoken = await AsyncStorage.getItem("token");
    let { room, roomType, startDate, endDate, noOfRooms } = data;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": usertoken,
        "Access-Control-Allow-Origin": "*",
      },
    };

    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);
    let BookingData = {
      RoomId: room._id,
      roomType: roomType,
      startDate: startDate,
      endDate: endDate,
    };
    console.log(BookingData);
    // let formData = new FormData();
    // formData.append("", data.RoomId);
    // formData.append("startDate", data.startDate);
    // formData.append("endDate", data.toDate);
    // formData.append("roomType", data.reserveRoomType);
    let response = await axios.post(
      `${BASE_URL}/hotelRep/roomAvailability`,
      BookingData,
      config
    );
    console.log(response.data.response);
    let bookedRooms = response.data.response.total
      ? response.data.response.total
      : 0;
    let emptyRooms = room.NoOfRooms - bookedRooms;
    // console.log(bookedRooms);
    // let emptyRooms = 1;
    let res = null;
    if (emptyRooms > noOfRooms) {
      res = {
        msg: "",
        status: true,
      };
      return res;
    } else {
      if (emptyRooms === 0) {
        res = {
          msg: "Sorry No rooms available try another Hotel",
          status: false,
        };
        return res;
      } else {
        res = {
          msg: `We only have ${emptyRooms} Available`,
          status: false,
        };
        return res;
      }
      // return false;
    }
    // return response.data.response;
  } catch (error) {
    console.error(error);
  }
};

//set laoding true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
