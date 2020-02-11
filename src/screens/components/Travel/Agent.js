import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import {
  Ionicons as Icons,
  FontAwesome as FIcons,
  Feather as FeatherIcon,
  MaterialIcons as Mat,
  EvilIcons,
  Entypo
} from "@expo/vector-icons";
const width = Dimensions.get("window").width;
const Agent = ({ placeUri, placeName, duration, placeDes }) => {
  return (
    <View
      style={{
        height: 300,
        width: width,
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#dddddd"
      }}
    >
      <Image
        source={placeUri}
        style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: "cover"
        }}
      />
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10
          //   justifyContent: "space-between"
        }}
      >
        <Text style={{ fontSize: 18 }}>
          <Entypo name="location-pin" size={24} /> {placeName}
        </Text>
        <Text style={{ fontSize: 18 }}>
          <FeatherIcon name="clock" size={24} /> {duration}
        </Text>
        <Text style={{ fontSize: 14, opacity: 0.4, textAlign: "justify" }}>
          {placeDes}
        </Text>
      </View>
    </View>
  );
};

export default Agent;
