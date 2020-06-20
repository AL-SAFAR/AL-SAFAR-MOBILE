import React from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import { View, Button } from "native-base";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Swing } from "react-native-animated-spinkit";
const { width } = Dimensions.get("window");

// import styles from "./FindDriverStyles";
const BookingProcessing = () => {
  //   const { selectedPickUp, selectedDropOff } = selectedAddress || {};
  return (
    // <View style={styles.Container}>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0099ff",
      }}
    >
      <Swing style={styles.spinner} size={150} color="#FFF" />
      <View style={styles.content}>
        <Text style={styles.text}> Processing your request</Text>
        <View>
          <Text style={styles.termsText}>
            By booking you confirm that you accept our T & C
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = {
  Container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#0099ff",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    // flexGrow: 2,
    alignContent: "center",
    marginTop: 50,
  },
  btn: {
    marginTop: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
    // marginBottom: 15,
    // marginTop: 15,
  },
  locationIcon: {
    color: "#fff",
    fontSize: 40,
    marginTop: 15,
  },
  content: {
    // position: "absolute",
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  termsText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 15,
  },
};

export default BookingProcessing;
