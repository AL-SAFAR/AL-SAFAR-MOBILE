import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const CurrentLocationBtn = props => {
  const cb = props.cb
    ? props.cb
    : () => console.log("Callback function not passed to CurrentLocationBtn!");

  const bottom = props.bottom ? props.bottom : 160;
  return (
    <View style={[styles.container, { top: height - bottom }]}>
      <MaterialIcons
        name="my-location"
        color="black"
        size={25}
        onPress={() => {
          cb();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    width: 45,
    height: 45,
    backgroundColor: "#fff",
    left: width - 70,
    borderRadius: 50,
    shadowColor: "black",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: "space-around",
    alignItems: "center"
  }
});
