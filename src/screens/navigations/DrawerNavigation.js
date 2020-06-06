import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
// import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "../SettingsScreen";
import SupportScreen from "../SupportScreen";
import BookingHistory from "../BookingHistory";
import HomeNavigation from "../navigations/HomeNavigation";

import { Ionicons as Icons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const CustomDrawerComponent = (props) => {
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../../assets/headerPattern.jpg")}
        style={{ width: undefined, padding: 16, paddingTop: 48 }}
      >
        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1591238856576-44bf9f35c141?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
          }}
          style={styles.profile}
        />
        <Text style={styles.name}>Sophie Stewart</Text>
      </ImageBackground>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      <View
        style={{
          flex: 1,
          alignSelf: "flex-end",
          marginBottom: 36,
        }}
      >
        <Text>Log Out</Text>
      </View>
    </SafeAreaView>
  );
};

const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeNavigation: {
      screen: HomeNavigation,
      navigationOptions: {
        title: "Home",
        drawerIcon: ({ tintColor }) => (
          <Icons name="ios-home" size={24} color={tintColor} />
        ),
      },
    },
    History: {
      screen: BookingHistory,
      navigationOptions: {
        title: "Trips History",
        drawerIcon: ({ tintColor }) => (
          <Icons name="md-bookmarks" size={24} color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Settings",
        drawerIcon: ({ tintColor }) => (
          <Icons name="ios-settings" size={24} color={tintColor} />
        ),
      },
    },
    Support: {
      screen: SupportScreen,
      navigationOptions: {
        title: "Support",
        drawerIcon: ({ tintColor }) => (
          <Icons name="md-person" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    contentComponent: CustomDrawerComponent,
    drawerWidth: width * 0.85,
    hideStatusBar: true,
    contentOptions: {
      activeBackgroundColor: "#0099ff",
      activeTintColor: "#fff",
      itemsContainerStyle: {
        marginTop: 16,
        marginHorizontal: 8,
      },
      itemStyle: {
        borderRadius: 4,
      },
    },
  }
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 8,
  },
});

export default createAppContainer(AppDrawerNavigator);
