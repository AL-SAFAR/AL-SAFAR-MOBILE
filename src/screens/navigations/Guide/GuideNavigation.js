import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import DrawerNavigation from "../DrawerNavigation";
import Profile from "../../components/Guide/Profile";
import Chat from "../../components/Chat/Chat";
// import TravelGuide from "../../components/Guide/TravelGuide";
const screens = {
  DrawerNavigation: {
    screen: DrawerNavigation,
    navigationOptions: {
      headerShown: false,
    },
  },
  GuideProfile: {
    screen: Profile,
    navigationOptions: {
      headerShown: false,
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const GuideStack = createStackNavigator(screens);

export default createAppContainer(GuideStack);
