import React from "react";
import { View, Dimensions, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const TravelGuide = ({ guide, navigation }) => {
  const { profileImage, name, city, serviceCharges, places } = guide;
  const placeUri = { uri: places[0].placeImage };
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("GuideProfile", { guide: guide });
      }}
    >
      {console.log(profileImage)}
      <View
        style={{
          height: 300,
          width: width,
          marginTop: 10,
          // marginHorizontal: 50,
          // marginHorizontal: 20,
          borderWidth: 0.5,
          borderColor: "#dddddd",
        }}
      >
        <Image
          source={placeUri}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "cover",
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
            backgroundColor: "rgba(0, 0, 0, 0.40)",
          }}
        >
          <View style={{ paddingTop: 10, paddingLeft: 5 }}>
            <Text style={{ color: "#fff", fontSize: 27 }}>
              <Text style={{ color: "#fff", fontSize: 15 }}>$</Text>
              {serviceCharges}
              <Text
                style={{
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                {"  "}Per Day
              </Text>
            </Text>
          </View>
        </View>
        <Image
          source={{ uri: profileImage }}
          style={{
            flex: 1,
            position: "absolute",
            right: 20,
            bottom: 30,
            width: 80,
            height: 80,
            borderColor: "#fff",
            borderWidth: 2,
            borderRadius: 50,
            resizeMode: "cover",
          }}
        />
        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 18, flexWrap: "wrap" }}>{name}</Text>
          <Text style={{ fontSize: 14, opacity: 0.4 }}>{city}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TravelGuide;
