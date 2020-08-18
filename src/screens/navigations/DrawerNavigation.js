import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  View,
  AsyncStorage,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ClippingRectangle,
} from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer, NavigationActions } from "react-navigation";
// import { Root, Popup } from "popup-ui"; // import { reduxForm } from "redux-form";
// import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "../SettingsScreen";
import SupportScreen from "../SupportScreen";
import BookingHistory from "../BookingHistory";
import HomeNavigation from "../navigations/HomeNavigation";
import { logout } from "../actions/authActions";
import { Ionicons as Icons } from "@expo/vector-icons";
import { DEFAULT_IMAGE } from "../../../key.json";
const { width, height } = Dimensions.get("window");
const onlogout = async (navigation) => {
  await AsyncStorage.clear();
  navigation.navigate("Auth");
};
const CustomDrawerComponent = (props) => {
  const { navigation } = props;
  const [user, setuser] = useState({});
  useEffect(() => {
    AsyncStorage.getItem("user").then((data) => {
      setuser(JSON.parse(data));
      console.log(JSON.parse(data));
    });
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <ImageBackground
        source={require("../../../assets/headerPattern.jpg")}
        style={{ width: undefined, padding: 16, paddingTop: 48 }}
      >
        <Image
          source={{
            uri: (user.Image && user.Image) || DEFAULT_IMAGE,
          }}
          style={styles.profile}
        />
        <Text style={styles.name}>{user.name}</Text>
      </ImageBackground>

      <ScrollView style={{ flex: 1 }}>
        <DrawerItems {...props} />
      </ScrollView>
      <TouchableOpacity
        style={{
          height: 50,
          marginHorizontal: 30,
          marginBottom: 10,
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#000",
        }}
        onPress={
          // () => onlogout(navigation)
          () => {
            Alert.alert(
              "Logging Out",
              "Are you sure you want to Log Out?",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    onlogout(navigation);
                  },
                },
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
          }
        }
      >
        <Icons
          style={{ marginHorizontal: 10 }}
          name="md-log-out"
          size={24}
          color="white"
        />
        <Text style={{ fontSize: 18, color: "#fff", fontWeight: "300" }}>
          Log Out
        </Text>
      </TouchableOpacity>
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
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    margin: 16,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, .87)",
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default AppDrawerNavigator;
