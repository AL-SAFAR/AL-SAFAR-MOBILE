import { StyleSheet, Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full width
const styles = {
  map: {
    ...StyleSheet.absoluteFillObject,
  },
};

export default styles;
