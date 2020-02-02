import React from "react";
import { View, Text } from "react-native";

const Tag = ({ name }) => {
  return (
    <View
      style={{
        minHeight: 20,
        minWidth: 40,
        padding: 5,
        marginRight: 5,
        backgroundColor: "white",
        borderColor: "#dddddd",
        borderWidth: 1,
        borderRadius: 2
      }}
    >
      <Text style={{ fontWeight: "700", fontSize: 10 }}>{name}</Text>
    </View>
  );
};

export default Tag;
