import React, { useState } from "react";
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
import StarRating from "react-native-star-rating";
import moment from "moment";
const HotelCard = ({ hotel: { fromDate, toDate, charges, id } }) => {
  const [stars, setstars] = useState(0);
  const updateRating = (rating) => {
    setstars(rating);
  };
  fromDate = moment(fromDate).format("DD MMM YYYY");
  toDate = moment(toDate).format("DD MMM YYYY");
  const hotelImage = `https://source.unsplash.com/1600x900/?hotel/${id}`;

  return (
    <View style={styles.card}>
      <View style={{ flexGrow: 4 }}>
        <Image
          style={{ flex: 1, resizeMode: "cover" }}
          source={{
            uri: hotelImage,
          }}
        />
      </View>
      <View style={{ flexGrow: 1, flexDirection: "row" }}>
        <View style={styles.details}>
          <View style={{ alignSelf: "flex-start", marginLeft: 28 }}>
            <Text style={styles.date}>Start Date</Text>
          </View>
          <Text style={{ ...styles.addressName, color: "#0099ff" }}>
            {fromDate}
          </Text>
          {/* <View style={styles.tripDetails}> */}
          <View style={{ alignSelf: "flex-start", marginLeft: 28 }}>
            <Text style={styles.date}>End Date</Text>
          </View>
          <Text style={{ ...styles.addressName, color: "#0099ff" }}>
            {toDate}
          </Text>
          {/* </View> */}
        </View>
        <View style={styles.details}>
          <StarRating
            animation="flash"
            // disabled={true}
            fullStarColor="#D4AF37"
            maxStars={5}
            rating={stars}
            starSize={24}
            selectedStar={(rating) => updateRating(rating)}
          />
          <View style={{ ...styles.tripDetails, marginTop: 12 }}>
            <Text style={{ fontSize: 12 }}>CHARGES</Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#0099ff" }}
            >
              {charges} PKR
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HotelCard;

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
    // marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
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
