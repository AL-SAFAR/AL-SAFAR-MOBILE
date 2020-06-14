import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Button,
  View,
  Text,
  AsyncStorage,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
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
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import RegisterScreen from "./src/screens/components/Login/RegisterScreen";
import Login from "./src/screens/components/Login/Login";
import AccountNavigation from "./src/screens/navigations/DrawerItems/AccountNavigation";
import HistoryNavigation from "./src/screens/navigations/DrawerItems/HistoryNavigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";

const AppNavigator = createStackNavigator({
  Drawer: {
    screen: DrawerNavigation,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: HomeNavigation,
    navigationOptions: {
      headerShown: false,
    },
  },
  Guide: {
    screen: GuideNavigation,
    navigationOptions: {
      headerShown: false,
    },
  },
  Account: {
    screen: AccountNavigation,
    navigationOptions: {
      headerShown: false,
    },
  },
  History: {
    screen: HistoryNavigation,
    navigationOptions: {
      headerShown: false,
    },
  },
  Hotel: {
    screen: HotelNavigation,
    navigationOptions: {
      headerShown: false,
    },
  },
  Transport: {
    screen: TransportNavigation,
    navigationOptions: {
      headerShown: false,
    },
  },
});
AppNavigator.navigationOptions = {
  // Hide the header from AppNavigator stack
  headerShown: false,
};
const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});
const RootNavigator = createAnimatedSwitchNavigator(
  {
    AuthLoading: { screen: AuthLoadingScreen },
    Auth: AuthNavigator,
    App: AppNavigator,
  },
  {
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  }
);
// let sample = "";
// let token = AsyncStorage.getItem("token");
const Main = createAppContainer(RootNavigator);
const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
export default App;
