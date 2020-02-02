import React from "react";
import { StyleSheet, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import {
  Ionicons as Icons,
  FontAwesome as FIcons,
  AntDesign as AD,
  Feather as FeatherIcon
} from "@expo/vector-icons";

import Explore from "./src/screens/Explore";
import Transport from "./src/screens/Transport";
import Booking from "./src/screens/Booking";
import Guide from "./src/screens/Guide";
import Travel from "./src/screens/Travel";
// import { Login } from "./src/screens/Login";

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
            source={require("./assets/hotel.png")}
            style={{ height: 24, width: 24, tintColor: tintColor }}
          />
        )
      }
    },
    Travel: {
      screen: Travel,
      navigationOptions: {
        tabBarLabel: "AGENT",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("./assets/seller.png")}
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
            source={require("./assets/lighthouse.png")}
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
  // {
  //   initialRouteName: "Explore",
  //   activeColor: "#f0edf6",
  //   inactiveColor: "#3e2465",
  //   barStyle: { backgroundColor: "#694fad" }
  // }
);

export default createAppContainer(navigator);

// import React from "react";
// import { View, Text } from "react-native";

// const App = () => {
//   return (
//     <View>
//       <Text>Darkness</Text>
//     </View>
//   );
// };

// export default App;
