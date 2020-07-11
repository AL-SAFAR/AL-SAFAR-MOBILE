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
const AgentCard = ({ hotel }) => {
  //   const [stars, setstars] = useState(0);
  const [modalOpenHotel, setModalOpenHotel] = useState(false);
  const [modalOpenGuide, setModalOpenGuide] = useState(false);
  const [modalOpenPayment, setModalOpenPayment] = useState(false);

  //   city,
  //   hotelName,
  //   rent,
  //   hotel,
  //   starRating,
  //   imageUri,
  let { Hotel, fromDate, toDate, payment, id } = hotel;
  let { amount } = payment;
  let { city, hotelName, rent, hotel, starRating, hotelImages } = Hotel;
  const updateRating = (rating) => {
    setstars(rating);
  };
  fromDate = moment(fromDate).subtract(1, "days").format("DD MMM YYYY");
  // fromDate = fromDate.subtract(1, "days");
  toDate = moment(toDate).subtract(1, "days").format("DD MMM YYYY");
  // toDate = toDate.subtract(1, "days");

  //   const hotelImage = `https://source.unsplash.com/1600x900/?hotel/${id}`;

  return (
    <TouchableOpacity style={styles.card} onPress={() => setModalOpen(true)}>
      <Modal visible={modalOpenHotel} transparent={true} animationType="slide">
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View style={styles.modalView}>
            <HotelModal setModalOpen={setModalOpen} hotel={hotel} />
          </View>
        </View>
      </Modal>
      <View style={{ flexGrow: 1, flexDirection: "row" }}>
        <Text>Booking Made by Zendi Travels</Text>
      </View>

      <View style={{ flexGrow: 4 }}>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
            // alignItems: "stretch",
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: "auto",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              // console.log(hotel);
              // navigation.navigate("HotelProfile", { hotel: hotel });
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
                source={{ uri: hotelImages[0] }}
              />
              {/* <CacheImage
          style={styles.image}
          uri="https://www.planwallpaper.com/static/images/maxresdefault_8yZPhSS.jpg"
        /> */}
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
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {hotelName}
              </Text>
              <Text style={{ fontSize: 10 }}>Rs.{rent}</Text>
              {starRating > 0 ? (
                <StarRating
                  disable
                  maxStars={5}
                  rating={starRating}
                  starSize={10}
                />
              ) : (
                <StarRating disable maxStars={5} rating={3} starSize={10} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // console.log(hotel);
              // navigation.navigate("HotelProfile", { hotel: hotel });
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
                source={{ uri: hotel.hotelImages[0] }}
              />
              {/* <CacheImage
          style={styles.image}
          uri="https://www.planwallpaper.com/static/images/maxresdefault_8yZPhSS.jpg"
        /> */}
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
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {hotelName}
              </Text>
              <Text style={{ fontSize: 10 }}>Rs.{rent}</Text>
              {starRating > 0 ? (
                <StarRating
                  disable
                  maxStars={5}
                  rating={starRating}
                  starSize={10}
                />
              ) : (
                <StarRating disable maxStars={5} rating={3} starSize={10} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AgentCard;

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
