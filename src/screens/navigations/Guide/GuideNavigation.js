import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeNavigation from "../HomeNavigation";
import Profile from "../../components/Guide/Profile";
// import TravelGuide from "../../components/Guide/TravelGuide";
const screens = {
  HomeNavigation: {
    screen: HomeNavigation,
    navigationOptions: {
      headerShown: false
    }
  },
  GuideProfile: {
    screen: Profile,
    navigationOptions: {
      headerShown: false
    }
  }
};

const GuideStack = createStackNavigator(screens);

export default createAppContainer(GuideStack);
