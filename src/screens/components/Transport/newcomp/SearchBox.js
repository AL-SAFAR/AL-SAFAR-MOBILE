import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import { View, InputGroup, Input } from "native-base";
import { FontAwesome as FIcon } from "@expo/vector-icons";
import store from "../../../../../store";
const { width, height } = Dimensions.get("window");
const SearchBox = ({
  getInputData,
  handleTextChange,
  selectedAddress,
  inputValue,
  locationResults,
  getAddressPredictions,
  toggleSearchResultmodal,
}) => {
  const { selectedPickUp, selectedDropOff } = selectedAddress || {};
  const handleInput = (key, val) => {
    getInputData({
      key,
    });
    value: val, handleTextChange(val);
    // console.log(locationResults)
    if (locationResults.length > 0) getAddressPredictions(locationResults);
  };
  return (
    <View style={styles.searchBox}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>PICK UP</Text>
        <InputGroup>
          <FIcon name="search" size={15} color="#0099ff" />
          <Input
            onFocus={() => toggleSearchResultmodal("pickUp")}
            // value={inputValue}
            style={styles.inputSearch}
            placeholder="Choose PickUp Location"
            onChangeText={handleInput.bind(this, "pickUp")}
            value={selectedPickUp && selectedPickUp.name}
          />
        </InputGroup>
      </View>
      <View style={styles.secondInputWrapper}>
        <Text style={styles.label}>DROP OFF</Text>
        <InputGroup>
          <FIcon name="search" size={15} color="#0099ff" />
          <Input
            onFocus={() => toggleSearchResultmodal("dropOff")}
            // value={inputValue}
            style={styles.inputSearch}
            placeholder="Choose DropOff Location"
            onChangeText={handleInput.bind(this, "dropOff")}
            value={selectedDropOff && selectedDropOff.name}
          />
        </InputGroup>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    top: 60,
    position: "absolute",
    width: width,
  },
  inputWrapper: {
    marginLeft: 15,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "#fff",
    opacity: 0.9,
    borderRadius: 7,
  },
  secondInputWrapper: {
    marginLeft: 15,
    marginRight: 10,
    marginTop: 5,
    backgroundColor: "#fff",
    opacity: 0.9,
    borderRadius: 7,
  },
  inputSearch: {
    fontSize: 14,
  },
  label: {
    fontSize: 10,
    fontStyle: "italic",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 0,
  },
});

export default SearchBox;
