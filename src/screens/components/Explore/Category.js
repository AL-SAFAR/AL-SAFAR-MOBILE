import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const Category = ({ imageUri, Name, searchHotels }) => {
  return (
    <TouchableOpacity onPress={() => searchHotels && searchHotels(Name)}>
      <View
        style={{
          height: 130,
          width: 130,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: "#dddddd",
          borderRadius: 10,
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            source={imageUri}
            style={{
              borderRadius: 10,
              borderWidth: null,
              flex: 1,
              width: null,
              height: null,
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
          <Text>{Name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Category;
