import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Entypo } from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import HotelModal from "./HotelModal";
import GuideModal from "./GuideModal";
import PaymentModal from "./PaymentModal";
import moment from "moment";
const AgentCard = ({ agentBooking }) => {
  const [stars, setstars] = useState(0);
  const [modalOpenHotel, setModalOpenHotel] = useState(false);
  const [modalOpenGuide, setModalOpenGuide] = useState(false);
  const [modalOpenPayment, setModalOpenPayment] = useState(false);

  //   city,
  //   hotelName,
  //   rent,
  //   hotel,
  //   starRating,
  //   imageUri,
  // let { Hotel, fromDate, toDate, payment, id } = hotel;
  // let { amount } = payment;
  // let { city, hotelName, rent, hotel, starRating, hotelImages } = Hotel;
  const updateRating = (rating) => {
    setstars(rating);
  };
  // fromDate = moment(fromDate).subtract(1, "days").format("DD MMM YYYY");
  // fromDate = fromDate.subtract(1, "days");
  // toDate = moment(toDate).subtract(1, "days").format("DD MMM YYYY");
  // toDate = toDate.subtract(1, "days");

  //   const hotelImage = `https://source.unsplash.com/1600x900/?hotel/${id}`;

  return (
    <View style={styles.card}>
      <Modal visible={modalOpenHotel} transparent={true} animationType="slide">
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View style={styles.modalView}>
            <HotelModal />
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "#0099ff",
                  // marginTop: 10,
                  width: width / 4,
                  elevation: 5,
                  height: 40,
                },
              ]}
              onPress={() => setModalOpenHotel(false)}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
          {/* <Text>das</Text> */}
        </View>
      </Modal>
      <Modal visible={modalOpenGuide} transparent={true} animationType="slide">
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View style={styles.modalView}>
            <GuideModal />
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "#0099ff",
                  // marginTop:0,
                  width: width / 4,
                  height: 40,
                  elevation: 5,
                },
              ]}
              onPress={() => setModalOpenGuide(false)}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
          {/* <Text>das</Text> */}
        </View>
      </Modal>
      <Modal
        visible={modalOpenPayment}
        transparent={true}
        animationType="slide"
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View style={styles.modalView}>
            <PaymentModal />
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "#0099ff",
                  // marginTop:0,
                  width: width / 4,
                  height: 40,
                  elevation: 5,
                },
              ]}
              onPress={() => setModalOpenPayment(false)}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
          {/* <Text>das</Text> */}
        </View>
      </Modal>
      <View
        style={{
          flexGrow: 1,
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ fontWeight: "600" }}>Booking Made by Zendi Travels</Text>
      </View>

      <View style={{ flexGrow: 4 }}>
        <View
          style={{
            // paddingHorizontal: 20,
            marginTop: 20,
            // alignItems: "stretch",
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: "auto",
            justifyContent: "space-evenly",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setModalOpenHotel(true)}
            // console.log(hotel);
            // navigation.navigate("HotelProfile", { hotel: hotel });

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
            {/* <View > */}

            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "cover",
              }}
              source={{
                uri:
                  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                // hotelImages[0]
              }}
            />
            {/* <CacheImage
          style={styles.image}
          uri="https://www.planwallpaper.com/static/images/maxresdefault_8yZPhSS.jpg"
        /> */}
            {/* </View> */}
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
                justifyContent: "space-evenly",
                paddingLeft: 10,
              }}
            >
              <Text style={{ fontSize: 10, color: "#b63838" }}>
                {/* {city} */}
                Islamabad
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {/* {hotelName} */}
                Nack
              </Text>
              <Text style={{ fontSize: 10 }}>
                Rs.
                {/* {rent} */}
                1000
              </Text>
              {stars > 0 ? (
                <StarRating disable maxStars={5} rating={stars} starSize={10} />
              ) : (
                <StarRating disable maxStars={5} rating={3} starSize={10} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalOpenGuide(true)}
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
                source={{
                  uri:
                    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                  // hotelImages[0]
                }}
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
              <Text style={{ fontSize: 10, color: "#b63838" }}>
                {/* {city} */}
                Islamabad
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {/* {hotelName} */}
              </Text>
              <Text style={{ fontSize: 10 }}>
                Rs.
                {/* {rent} */}
                1000
              </Text>
              {stars > 0 ? (
                <StarRating disable maxStars={5} rating={stars} starSize={10} />
              ) : (
                <StarRating disable maxStars={5} rating={3} starSize={10} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            // paddingHorizontal: 20,
            // marginTop: 20,
            // alignItems: "stretch",
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: "auto",
            justifyContent: "space-between",
            // marginBottom: 10,
          }}
        >
          <View style={{ marginLeft: 20 }}>
            <Text style={{ color: "#0099ff", fontWeight: "bold" }}>
              Total Charges
            </Text>
            <Text>Rs. 10000</Text>
            {/* <Text style={{ color: "#fff" }}>Service Charges</Text> */}
          </View>
          {/* <Button title="confirm" /> */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#0099ff" }]}
            onPress={() => setModalOpenPayment(true)}
          >
            <Text style={{ color: "#fff" }}>Confirm</Text>
          </TouchableOpacity>
          {/* <Button title="confirm" /> */}
          {/* <Button title="confirm" /> */}
          {/* <Button>dsa</Button> */}
        </View>
      </View>
    </View>
  );
};

export default AgentCard;

const styles = StyleSheet.create({
  button: {
    // color: "#fff",
    // borderColor: "#0099ff",
    width: width / 5,
    height: 30,
    // marginVertical: 10,
    // borderWidth: 2,
    marginHorizontal: 10,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 280,
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
    marginVertical: 50,
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
