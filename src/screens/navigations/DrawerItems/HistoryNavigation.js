import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import BookingHistory from "../../BookingHistory";
import DrawerNavigation from "../../navigations/DrawerNavigation";
import HistoryScreen from "../../components/History/HistoryScreen";
import { BookingProfile as CarBookingProfile } from "../../components/History/Car/BookingProfile";
// import TravelGuide from "../../components/Guide/TravelGuide";
const screens = {
  History: {
    screen: BookingHistory,
    navigationOptions: {
      headerShown: false,
    },
  },
  HistoryScreen: {
    screen: HistoryScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  CarBookingProfile: {
    screen: CarBookingProfile,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const HistoryStack = createStackNavigator(screens);

export default createAppContainer(HistoryStack);
