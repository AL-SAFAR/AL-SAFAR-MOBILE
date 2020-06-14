import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../../../../styles/global";
import { Ionicons, Entypo } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import { DISTANCE_DIRECTION_KEY } from "../../../../../key.json";
import StarRating from "react-native-star-rating";

export const BookingProfile = ({ navigation }) => {
  const book = navigation.getParam("book");
  const { pickUp, dropOff } = book;
  const center = navigation.getParam("center");
  const mapUri = `https://maps.googleapis.com/maps/api/staticmap?center=${center.latitude},${center.longitude}&zoom=13&size=340x640&maptype=roadmap&markers=color:blue%7C${pickUp.latitude},${pickUp.longitude}&markers=color:green%7C${dropOff.latitude},${dropOff.longitude}&key=${DISTANCE_DIRECTION_KEY}`;
  const [stars, setstars] = useState(0);
  return (
    <SafeAreaView style={globalStyles.container}>
      <ImageBackground
        style={{ flex: 1, resizeMode: "cover" }}
        source={{ uri: mapUri }}
      >
        <View style={globalStyles.titleBar}>
          <TouchableOpacity
            onPress={() => navigation.navigate("HistoryScreen")}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "black",
              }}
            >
              <Ionicons name="ios-arrow-back" size={24} color="#fff"></Ionicons>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
        >
          <View style={styles.card}>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View
                style={{
                  flexGrow: 1,
                  alignItems: "flex-start",
                  marginLeft: 20,
                  // justifyContent: "cente",
                }}
              >
                <Text style={{ fontSize: 24, color: "#0099ff" }}>
                  Jamal Akhtar
                </Text>
                <Text style={{ fontSize: 12, color: "#B2B2B2" }}>BLE 2345</Text>
              </View>
              <View
                style={{ flexGrow: 1, marginRight: 20, alignItems: "flex-end" }}
              >
                <Text style={{ fontSize: 16, color: "#B2B2B2" }}>
                  Honda Civic
                </Text>
                <StarRating
                  animation="flash"
                  // disabled={true}
                  fullStarColor="#D4AF37"
                  maxStars={5}
                  rating={stars}
                  starSize={24}
                  selectedStar={(rating) => setstars(rating)}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.details}>
                <Entypo name="location-pin" size={32} color="#0099ff" />
                {/* <Text>sjan</Text> */}
                <Text style={{ ...styles.addressName, color: "#0099ff" }}>
                  {pickUp.name}
                </Text>
                <View style={styles.tripDetails}>
                  <Text style={styles.addressName}>FARE</Text>
                  <Text style={{ fontSize: 12 }}>170 PKR</Text>
                </View>
              </View>
              <View style={styles.details}>
                <Entypo name="location-pin" size={32} color="#32cd32" />
                <Text style={{ ...styles.addressName, color: "#32cd32" }}>
                  {dropOff.name}
                </Text>
                <View style={styles.tripDetails}>
                  <Text style={styles.addressName}>DISTANCE</Text>
                  <Text style={{ fontSize: 12 }}>1.2 KM</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    // flex: 1,
    marginHorizontal: 20,
    // marginVertical: 10,
    height: 200,
    backgroundColor: "#fff",
    width: width * 0.9,
    borderRadius: 10,
    borderWidth: null,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 6,
  },
  details: {
    flexDirection: "column",
    flexGrow: 1,
    // marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  addressName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tripDetails: {
    alignItems: "center",
  },
});
