import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Ionicons as Icon } from "@expo/vector-icons";

export const CarHistory = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View style={styles.IconCol}>
          <Icon
            // style={{ alignSelf: "flex-start" }}
            name="ios-car"
            size={32}
            color="#fff"
          />
        </View>
        <View style={styles.TypeCol}>
          <Text style={styles.heading}>Car Bookings</Text>
        </View>
        {/* <Text>sssad</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 100,
    backgroundColor: "#fff",
    width: width * 0.9,
    borderRadius: 10,
    borderWidth: null,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 6,
  },
  IconCol: {
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    flexGrow: 4,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0099ff",
  },
  TypeCol: {
    alignItems: "center",
    height: "100%",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    justifyContent: "center",
    flexGrow: 6,
    // backgroundColor: "#000",
  },
  heading: {
    fontSize: 24,
    fontWeight: "500",
    color: "#0099ff",
    // textShadowColor: "rgba(0, 0, 0, 0.75)",
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 1,
  },
});
