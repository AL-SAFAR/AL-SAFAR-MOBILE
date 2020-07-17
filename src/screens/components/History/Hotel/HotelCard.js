import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Entypo } from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import HotelModal from "./HotelModal";
import moment from "moment";
const HotelCard = ({ hotel }) => {
  const [stars, setstars] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  let { fromDate, toDate, payment, id, Hotel } = hotel;
  let { amount } = payment;
  let { hotelImages } = Hotel;

  const updateRating = (rating) => {
    setstars(rating);
  };
  fromDate = moment(fromDate).subtract(1, "days").format("DD MMM YYYY");
  // fromDate = fromDate.subtract(1, "days");
  toDate = moment(toDate).subtract(1, "days").format("DD MMM YYYY");
  // toDate = toDate.subtract(1, "days");

  // const hotelImage = `https://source.unsplash.com/1600x900/?hotel/${id}`;

  return (
    <TouchableOpacity style={styles.card} onPress={() => setModalOpen(true)}>
      <Modal visible={modalOpen} transparent={true} animationType="slide">
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View style={styles.modalView}>
            {/* <MaterialIcons
            name="close"
            size={24}
            style={styles.modalToggle}
            onPress={() => setModalOpen(false)}
          /> */}
            <HotelModal setModalOpen={setModalOpen} hotel={hotel} />
          </View>
        </View>
      </Modal>
      <View style={{ flexGrow: 4 }}>
        <Image
          style={{ flex: 1, resizeMode: "cover" }}
          source={{
            uri: hotelImages[0],
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
              {amount} PKR
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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

  modalView: {
    flex: 1,
    // margin: 20,
    backgroundColor: "white",
    // marginVertical: height / 2,
    // marginTop: 50,
    // marginBottom: 50,
    borderRadius: 20,
    marginVertical: width / 5,
    marginHorizontal: 20,
    // padding: 300,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tripDetails: {
    alignItems: "center",
    // paddingTop: 50,
    // paddingBottom: 0,
    // justifyContent: "flex-end",
  },
});
