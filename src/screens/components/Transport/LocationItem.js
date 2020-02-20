import React, { PureComponent } from "react";
import {
  Dimensions,
  View,
  Keyboard,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
const width = Dimensions.get("window").width;

const LocationItem = ({
  description,
  place_id,
  clearSearch,
  isSearching,
  update,
  onPress,
  fetchDetails
}) => {
  // _handlePress = async () => {
  //   // const { setFieldGrupo, setFieldPartida, fetchDetails, onPress, isPartida, isSearching } = this.props;
  //   const res = await fetchDetails(place_id);
  //   const { lat, lng } = res.geometry.location;

  //   inputValue = res.formatted_address;
  //   if (isSearching) {
  //     console.log("isSearching");
  //   } else if (isPartida) {
  //     let region = {
  //       latitude: lat,
  //       longitude: lng,
  //       latitudeDelta: 0.015,
  //       longitudeDelta: 0.0121
  //     };
  //     update(region, inputValue);
  //   } else {
  //     update(region, inputValue);
  //   }
  //   onPress();
  // };

  return (
    <TouchableOpacity
      style={styles.root}
      //  onPress={this._handlePress}
    >
      <Text>{description}</Text>
    </TouchableOpacity>
  );
};

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
