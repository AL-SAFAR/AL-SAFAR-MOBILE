import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeNavigation from "../HomeNavigation";
import HotelProfile from "../../components/Hotel/HotelProfile";
// import Hotel from "../../components/Hotel/Hotel";
const screens = {
  HomeNavigation: {
    screen: HomeNavigation,
    navigationOptions: {
      headerShown: false
    }
  },
  HotelProfile: {
    screen: HotelProfile,
    navigationOptions: {
      headerShown: false
    }
  }
};

const HotelStack = createStackNavigator(screens);

export default createAppContainer(HotelStack);
