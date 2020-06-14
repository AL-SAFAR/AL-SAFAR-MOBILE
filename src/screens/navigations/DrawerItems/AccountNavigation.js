import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SettingsScreen from "../../SettingsScreen";
import EditProfile from "../../components/Account/EditProfile";
// import TravelGuide from "../../components/Guide/TravelGuide";
const screens = {
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const AccountStack = createStackNavigator(screens);

export default createAppContainer(AccountStack);
