import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";
const Hotel = ({
  width,
  city,
  hotelName,
  rent,
  hotel,
  starRating,
  imageUri,
  navigation,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        // console.log(hotel);
        navigation.navigate("HotelProfile", { hotel: hotel });
      }}
      style={{
        width: width / 2 - 30,
        height: width / 2 - 30,
        borderWidth: 1,
        borderColor: "#dddddd",
        marginBottom: 15,
        // marginHorizontal: 20
        // marginRight: 15
      }}
    >
      <View style={{ flex: 1 }}>
        <Image
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "cover",
          }}
          source={imageUri}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          paddingLeft: 10,
        }}
      >
        <Text style={{ fontSize: 10, color: "#b63838" }}>{city}</Text>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>{hotelName}</Text>
        <Text style={{ fontSize: 10 }}>Rs.{rent}</Text>
        {starRating > 0 ? (
          <StarRating disable maxStars={5} rating={starRating} starSize={10} />
        ) : (
          <StarRating disable maxStars={5} rating={3} starSize={10} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Hotel;
