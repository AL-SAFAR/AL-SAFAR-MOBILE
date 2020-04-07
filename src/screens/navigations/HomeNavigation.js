import React, { Component } from "react";
import { StyleSheet, Image, Button, View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
// import { createDrawerNavigator } from "react-navigation-drawer";
import {
  Ionicons as Icons,
  FontAwesome as FIcons,
  AntDesign as AD,
  Feather as FeatherIcon
} from "@expo/vector-icons";

import Payment from "../components/Payment";
import Explore from "../Explore";
import Transport from "../Transport";
import Booking from "../Booking";
import Guide from "../Guide";
import TravelAgent from "../TravelAgent";

const navigator = createBottomTabNavigator(
  // export default createMaterialBottomTabNavigator(
  {
    Explore: {
      screen: Explore,
      navigationOptions: {
        tabBarLabel: "EXPLORE",
        tabBarIcon: ({ tintColor }) => (
          <Icons name="ios-search" color={tintColor} size={24} />
        )
      }
    },
    Transport: {
      screen: Transport,
      navigationOptions: {
        tabBarLabel: "TRANSPORT",
        tabBarIcon: ({ tintColor }) => (
          <AD name="car" color={tintColor} size={24} />
        )
      }
    },
    Booking: {
      screen: Booking,
      navigationOptions: {
        tabBarLabel: "BOOKINGS",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../../assets/hotel.png")}
            style={{ height: 24, width: 24, tintColor: tintColor }}
          />
        )
      }
    },
    Agent: {
      screen: TravelAgent,
      navigationOptions: {
        tabBarLabel: "AGENT",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../../assets/seller.png")}
            style={{ height: 24, width: 24, tintColor: tintColor }}
          />
        )
      }
    },
    Guide: {
      screen: Guide,
      navigationOptions: {
        tabBarLabel: "GUIDE",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../../assets/lighthouse.png")}
            style={{ height: 24, width: 24, tintColor: tintColor }}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#0099FF",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "white",
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 10
      }
    }
  }
);
export default createAppContainer(navigator);
