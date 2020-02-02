import React from "react";
import { View, Dimensions, Text, Image } from "react-native";

const width = Dimensions.get("window").width;
const TravelAgent = ({
  placeUri,
  placePrice,
  agentPic,
  placeName,
  placeDescription
}) => {
  return (
    <View
      style={{
        height: 300,
        width: width,
        marginTop: 10,
        // marginHorizontal: 50,
        // marginHorizontal: 20,
        borderWidth: 0.5,
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
          // flexDirection: "row",
          // alignContent: "center",
          position: "absolute",
          bottom: 80,
          width: 150,
          height: 60,
          backgroundColor: "rgba(0, 0, 0, 0.40)"
        }}
      >
        <View style={{ paddingTop: 10, paddingLeft: 5 }}>
          <Text style={{ color: "#fff", fontSize: 27 }}>
            <Text style={{ color: "#fff", fontSize: 15 }}>$</Text>
            {placePrice}
            <Text
              style={{
                color: "#fff",
                fontSize: 13,
                fontWeight: "500",
                textTransform: "uppercase"
              }}
            >
              {"  "}Per Night
            </Text>
          </Text>
        </View>
      </View>
      <Image
        source={agentPic}
        style={{
          flex: 1,
          position: "absolute",
          right: 30,
          bottom: 30,
          width: 80,
          height: 80,
          borderWidth: 2,
          borderColor: "#fff",
          borderRadius: 50,
          resizeMode: "cover"
        }}
      />
      <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 18 }}>{placeName}</Text>
        <Text style={{ fontSize: 14, opacity: 0.4 }}>{placeDescription}</Text>
      </View>
    </View>
  );
};

export default TravelAgent;
