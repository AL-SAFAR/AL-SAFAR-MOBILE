import React, { Fragment } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const width = Dimensions.get("window").width;
export const DestinationBtn = ({
  handleTextChange,
  // fetchDetails,
  // isSearching,
  inputValue
  // clearSearchs
}) => {
  // const cb =
  //   props.cb != undefined
  //     ? props.cb
  //     : () => {
  //         console.log("Callback function not passed to DestinationButton()");
  //       };

  return (
    <TouchableOpacity
      onPress={() => {
        // cb();
      }}
      style={styles.container}
    >
      <View style={styles.leftCol}>
        <Text style={{ color: "#0099FF", fontSize: 10 }}>{"\u25A0"}</Text>
      </View>
      <View style={styles.centerCol}>
        <TextInput
          placeholder="Where To?"
          style={{
            fontFamily: "sans-serif-thin",
            fontSize: 21,
            color: "#545454"
          }}
          onChangeText={handleTextChange}
          value={inputValue}
        />
      </View>
      <View style={styles.rightCol}>
        <Ionicons
          name="md-car"
          color="#0099FF"
          size={25}
          style={{ alignSelf: "center" }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    flexDirection: "row",
    width: width - 40,
    height: 60,
    top: 90,
    left: 20,
    borderRadius: 2,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  leftCol: {
    flex: 1,
    alignItems: "center"
  },
  centerCol: {
    flex: 4
  },
  rightCol: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: "#ededed"
  }
});
