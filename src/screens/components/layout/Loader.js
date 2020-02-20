import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={100} color="#0099ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});
export default Loader;
