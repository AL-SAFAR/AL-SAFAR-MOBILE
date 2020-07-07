import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Entypo } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
const ASPECT_RATIO = width / height;
import { DISTANCE_DIRECTION_KEY } from "../../../../../key.json";
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
const CarCard = ({ book, navigation }) => {
  const { pickUp, dropOff, distance, fare } = book;
  //   const pickUp = {
  //     name: "Kohati Bazar",
  //     latitude: 33.62193060000001,
  //     longitude: 73.0645363,
  //   };
  //   const dropOff = {
  //     name: "Satellite Town",
  //     latitude: 33.6412348,
  //     longitude: 73.0634749,
  //   };
  const center = {
    latitude: (pickUp.latitude + dropOff.latitude) / 2,
    longitude: (pickUp.longitude + dropOff.longitude) / 2,
  };
  const mapUri = `https://maps.googleapis.com/maps/api/staticmap?center=${center.latitude},${center.longitude}&zoom=13&size=600x600&maptype=roadmap&markers=color:blue%7C${pickUp.latitude},${pickUp.longitude}&markers=color:green%7C${dropOff.latitude},${dropOff.longitude}&key=${DISTANCE_DIRECTION_KEY}`;
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("CarBookingProfile", { book: book, center: center })
      }
    >
      <View style={{ flexGrow: 4 }}>
        <Image
          style={{ flex: 1, resizeMode: "cover" }}
          source={{ uri: mapUri }}
        />
      </View>
      <View style={{ flexGrow: 1, flexDirection: "row" }}>
        <View style={styles.details}>
          <Entypo name="location-pin" size={32} color="#0099ff" />
          {/* <Text>sjan</Text> */}
          <Text style={{ ...styles.addressName, color: "#0099ff" }}>
            {pickUp.name}
          </Text>
          <View style={styles.tripDetails}>
            <Text style={styles.addressName}>FARE</Text>
            <Text style={{ fontSize: 12 }}>{fare} PKR</Text>
          </View>
        </View>
        <View style={styles.details}>
          <Entypo name="location-pin" size={32} color="#32cd32" />
          <Text style={{ ...styles.addressName, color: "#32cd32" }}>
            {dropOff.name}
          </Text>
          <View style={styles.tripDetails}>
            <Text style={styles.addressName}>DISTANCE</Text>
            <Text style={{ fontSize: 12 }}>
              {Object.values(distance)[0]} KM
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 300,
    backgroundColor: "#fff",
    width: width * 0.9,
    borderRadius: 10,
    borderWidth: null,
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
    // paddingTop: 50,
    // paddingBottom: 0,
    // justifyContent: "flex-end",
  },
});
export default CarCard;
