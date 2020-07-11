import React, { useRef, useState } from "react";
import { View, TextInput } from "react-native";
import PropTypes from "prop-types";
import { Ionicons as Icons } from "@expo/vector-icons";
const SearchBar = ({ search }) => {
  const text = useRef("maskd");
  const [value, setValue] = useState("");
  const onChange = (t) => {
    // setValue(t.nativeEvent.text);
    // console.log(t.nativeEvent.text);
    search(t);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "white",
        marginTop: 10,
        marginHorizontal: 20,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "black",
        shadowOpacity: 0.2,
        elevation: 4,
        // marginTop: 30
      }}
    >
      <Icons
        name="ios-search"
        size={25}
        style={{ marginRight: 10, alignSelf: "center" }}
      />
      <TextInput
        underlineColorAndroid="transparent"
        placeholder="Try Islamabad"
        ref={text}
        value={value}
        onChange={(t) => {
          setValue(t.nativeEvent.text);
          // console.log(value);
          onChange(t.nativeEvent.text);
        }}
        placeholderTextColor="grey"
        style={{
          flex: 1,
          fontWeight: "700",
          backgroundColor: "white",
          alignSelf: "center",
        }}
      />
    </View>
  );
};
SearchBar.propTypes = {
  search: PropTypes.func.isRequired,
};
// connect(null, { searchHotels })(
export default SearchBar;
