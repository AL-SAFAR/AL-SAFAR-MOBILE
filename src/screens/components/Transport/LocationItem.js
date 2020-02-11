import React, { PureComponent } from "react";
import {
  Dimensions,
  View,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
const width = Dimensions.get("window").width;

class LocationItem extends PureComponent {
  // updateValue = async () => {
  //   const res = await this.props.fetchDetails(this.props.place_id);
  //   // console.log("result", res);
  // };

  render() {
    return (
      <TouchableOpacity
        style={styles.root}
        onPress={() => this.props.updateValue(this.props.description)}
      >
        <Text>{this.props.description}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: width - 40,
    justifyContent: "center"
  }
});

export default LocationItem;
