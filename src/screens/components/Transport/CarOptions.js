import React from "react";
import { View, StyleSheet } from "react-native";
const CarOptions = () => {
  return (
    <View style={styles.container}>
      <View>
        <View></View>
        <View></View>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    zIndex: 10,
    backgroundColor: "black"
  }
});

export default CarOptions;
