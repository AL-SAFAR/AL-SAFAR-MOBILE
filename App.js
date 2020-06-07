import React, { Component } from "react";
import { StyleSheet, Image, Button, View, Text } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  Ionicons as Icons,
  FontAwesome as FIcons,
  AntDesign as AD,
  Feather as FeatherIcon,
} from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "./store";

import HomeNavigation from "./src/screens/navigations/HomeNavigation";
import DrawerNavigation from "./src/screens/navigations/DrawerNavigation";
import GuideNavigation from "./src/screens/navigations/Guide/GuideNavigation";
import HotelNavigation from "./src/screens/navigations/Hotel/HotelNavigation";
import TransportNavigation from "./src/screens/navigations/Transport/TransportNavigation";

import RegisterScreen from "./src/screens/components/Login/RegisterScreen";
import Login from "./src/screens/components/Login/Login";
import AccountNavigation from "./src/screens/navigations/Acccount/AccountNavigation";
const AppSwitchNavigator = createSwitchNavigator({
  Drawer: {
    screen: DrawerNavigation,
  },
  Home: {
    screen: HomeNavigation,
  },
  Guide: {
    screen: GuideNavigation,
  },
  Account: {
    screen: AccountNavigation,
  },
  Hotel: {
    screen: HotelNavigation,
  },
  Transport: {
    screen: TransportNavigation,
  },
  Login: {
    screen: Login,
  },
  Register: {
    screen: RegisterScreen,
  },
});
const Main = createAppContainer(AppSwitchNavigator);
const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
export default App;
