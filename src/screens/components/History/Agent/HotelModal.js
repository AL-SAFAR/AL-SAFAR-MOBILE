import React, { useState } from "react";
// import AwesomeButton from "react-native-really-awesome-button";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Modal,
} from "react-native";
import ReadMore from "react-native-read-more-text";
// import {
//   Container,
//   Header,
//   Content,
//   Form,
//   Item,
//   Input,
//   Label
// } from "native-base";
import { SliderBox } from "react-native-image-slider-box";
import { globalStyles } from "../../../../../styles/global";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import BookingForm from "./BookingForm";
const { width, height } = Dimensions.get("window");
const hotelImages = [
  "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];
const HotelModal = () => {
  // console.log(hotel);
  //   const hotel = navigation.getParam("hotel");
  //   const {
  //     hotelName,
  //     address,
  //     description,
  //     hotelImages,
  //     starRating,
  //     extras,
  //     houseRules,
  //   } = hotel;

  //   const { foods, facilities, wifi, parking } = extras;
  //   const { checkIn, checkOut, Smoking } = houseRules;
  //   const { Activities, general } = facilities;
  //   const [modalOpen, setModalOpen] = useState(false);
  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: "#0099ff", marginTop: 5 }} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{ color: "#0099ff", marginTop: 5 }} onPress={handlePress}>
        Show less
      </Text>
    );
  };
  _handleTextReady = () => {
    // ...
  };

  return (
    <View
      style={{
        ...styles.container,
        ...globalStyles.container,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Images slider */}
        <View>
          <SliderBox
            images={hotelImages}
            sliderBoxHeight={200}
            // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            dotColor="#0099ff"
            inactiveDotColor="white"
            imageLoadingColor="#0099ff"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
          />
          {/* Name and Address */}
          <View style={styles.infoContainer}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: "200",
                  fontSize: 36,
                  textAlign: "center",
                  flexWrap: "wrap",
                },
              ]}
            >
              {/* {hotelName} */}
              PC
            </Text>
            <Text
              style={[
                styles.text,
                {
                  width: width / 2,
                  textAlign: "center",
                  color: "#0099ff",
                  fontSize: 14,
                  flexWrap: "wrap",
                },
              ]}
            >
              {/* {address} */}
              loremmcskxkaskk
            </Text>
          </View>
          {/* wifi,smoking,parking */}
          {/* <View style={styles.statsContainer}>
            {Smoking ? (
              <View style={styles.statsBox}>
                <MaterialIcons
                  name="smoking-rooms"
                  size={24}
                  color="#0099ff"
                ></MaterialIcons>
                <Text style={[styles.text, styles.subText]}>Smoking Area</Text>
              </View>
            ) : (
              <View style={styles.statsBox}>
                <Ionicons
                  name="logo-no-smoking"
                  size={24}
                  color="#0099ff"
                ></Ionicons>
                <Text style={[styles.text, styles.subText]}>No Smoking</Text>
              </View>
            )}
            {!wifi ? (
              <View
                style={[
                  styles.statsBox,
                  {
                    borderColor: "#DFD8C8",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  },
                ]}
              >
                <MaterialIcons
                  name="signal-wifi-off"
                  size={24}
                  color="#0099ff"
                ></MaterialIcons>
                <Text style={[styles.text, styles.subText]}>No Wifi</Text>
              </View>
            ) : (
              <View
                style={[
                  styles.statsBox,
                  {
                    borderColor: "#DFD8C8",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  },
                ]}
              >
                <MaterialIcons
                  name="wifi"
                  size={24}
                  color="#0099ff"
                ></MaterialIcons>
                <Text style={[styles.text, styles.subText]}>
                  Wifi Available
                </Text>
              </View>
            )}
            {parking ? (
              <View style={styles.statsBox}>
                <MaterialIcons
                  name="local-parking"
                  size={24}
                  color="#0099ff"
                ></MaterialIcons>
                <Text style={[styles.text, styles.subText]}>Parking</Text>
              </View>
            ) : (
              <View style={styles.statsBox}>
                <MaterialIcons
                  name="local-parking"
                  size={24}
                  color="#AEB5BC"
                ></MaterialIcons>
                <Text style={[styles.text, styles.subText]}> No Parking</Text>
              </View>
            )}
          </View>
          Description */}
          <View
            style={[
              styles.container,
              {
                paddingHorizontal: 10,
                textAlign: "justify",
                paddingVertical: 10,
              },
            ]}
          >
            <ReadMore
              numberOfLines={6}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}
            >
              <Text style={{ flexWrap: "wrap" }}>
                {/* {description} */}Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.
              </Text>
            </ReadMore>
          </View>
          <View style={{ flexDirection: "row" }}>
            {/* Foods */}
            <View
              style={{
                ...styles.infoContainer,
                width: width / 2 - 40,
                borderRightWidth: 1,
                borderColor: "#DFD8C8",
                marginTop: 5,
              }}
            >
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
                Food
              </Text>
              <View style={{ alignItems: "center" }}>
                <View style={styles.recentItem}>
                  <View style={{ flexDirection: "column", marginTop: 5 }}>
                    {/* {foods.map((food, key) => {
                      return (
                        <View key={key} style={styles.recentItem}>
                          <View style={styles.activityIndicator}></View>
                          <View>
                            <Text
                              style={[
                                styles.text,
                                { color: "#41444B", fontWeight: "300" },
                              ]}
                            >
                              {food}
                            </Text>
                          </View>
                        </View>
                      );
                    })} */}
                  </View>
                </View>
              </View>
            </View>
            {/* Facilities */}
            <View
              style={{
                ...styles.infoContainer,
                width: width / 2,
                marginTop: 5,
              }}
            >
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
                Activities {/* {Activities ? "Activities" : "Services"} */}
              </Text>
              <View style={{ alignItems: "center" }}>
                <View style={styles.recentItem}>
                  <View style={{ flexDirection: "column", marginTop: 5 }}>
                    {/* {Activities
                      ? Activities.map((activity, key) => {
                          return (
                            <View key={key} style={styles.recentItem}>
                              <View style={styles.activityIndicator}></View>
                              <View>
                                <Text
                                  style={[
                                    styles.text,
                                    { color: "#41444B", fontWeight: "300" },
                                  ]}
                                >
                                  {activity}
                                </Text>
                              </View>
                            </View>
                          );
                        })
                      : general.map((service, key) => {
                          return (
                            <View key={key} style={styles.recentItem}>
                              <View style={styles.activityIndicator}></View>
                              <View>
                                <Text
                                  style={[
                                    styles.text,
                                    { color: "#41444B", fontWeight: "300" },
                                  ]}
                                >
                                  {service}
                                </Text>
                              </View>
                            </View>
                          );
                        })} */}
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* checkin and check out */}
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text
                style={{ color: "#0099ff", fontWeight: "200", fontSize: 26 }}
              >
                {/* {checkIn} */}2:30
              </Text>

              <Text style={[styles.text, styles.subText]}>CheckIn</Text>
            </View>
            <View
              style={{
                ...styles.statsBox,
                borderColor: "#DFD8C8",
                borderLeftWidth: 1,
              }}
            >
              <Text
                style={{ color: "#0099ff", fontWeight: "200", fontSize: 26 }}
              >
                {/* {checkOut} */}2:50
              </Text>
              <Text style={[styles.text, styles.subText]}>CheckOut</Text>
            </View>
          </View>
          {/* book now button */}
          {/* <TouchableOpacity
            onPress={() => setModalOpen(true)}
            // style={{
            //   ...styles.statsContainer,
            //   marginVertical: 10,
            //   marginHorizontal: 10,
            //   borderRadius: 10,
            //   borderWidth: 1,
            //   padding: 5,
            //   backgroundColor: "#0099ff",
            // }}
          > */}
          {/* <View style={styles.statsBox}>
              <Text style={{ color: "white", fontWeight: "200", fontSize: 26 }}>
                BOOK NOW
              </Text>
            </View> */}
          {/* <View style={globalStyles.button}>
              <Text style={globalStyles.buttonText}>BOOK NOW</Text>
            </View> */}
          {/* </TouchableOpacity> */}
          {/* <View
            style={{
              marginVertical: 10,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AwesomeButton
              raiseLevel={4}
              backgroundColor="#FFF"
              textColor="#0099ff"
              backgroundDarker="#1073CE"
              borderColor="#1073CE"
              borderWidth={2}
              borderRadius={5}
              width={width - 50}
              textSize={24}
              onPress={(next) => {
                setModalOpen(true);
                next();
              }}
            >
              BOOK NOW
            </AwesomeButton>
          </View> */}
          <View
            style={{
              alignSelf: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "200",
                fontSize: 24,
                color: "#000",
                alignSelf: "center",
              }}
            >
              Booking Details
            </Text>
            <View
              style={{
                alignItems: "flex-start",
                paddingStart: 21,
                paddingTop: 10,
                marginTop: 5,
                width: 295,
                height: 181,
                borderRadius: 27,
                backgroundColor: "rgba(246, 245, 245, 255)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(0, 0, 0, 140)",
                  }}
                >
                  Booking ID:
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(0, 153, 255, 255)",
                    marginStart: 10,
                  }}
                >
                  {/* {_id} */}21312332
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(0, 0, 0, 140)",
                    marginTop: 7,
                  }}
                >
                  Booking Date:
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(0, 153, 255, 255)",
                    marginStart: 9,
                    marginTop: 7,
                  }}
                >
                  {/* {date} */}2-JAN-2020
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    alignItems: "flex-start",
                    //   marginStart: 13,
                    marginTop: 22,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      // alignContent: "flex-end",
                    }}
                  >
                    <Ionicons
                      style={{
                        marginRight: 10,
                        color: "#6F6F6F",
                      }}
                      size={24}
                      name="md-calendar"
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#6F6F6F",
                      }}
                    >
                      Start Date
                    </Text>
                    <Ionicons
                      style={{
                        marginRight: 10,
                        marginStart: 50,
                        color: "#6F6F6F",
                      }}
                      size={24}
                      name="md-calendar"
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#6F6F6F",
                      }}
                    >
                      End Date
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "rgba(0, 153, 255, 255)",
                        marginStart: 28,
                        //   marginTop: -1,
                      }}
                    >
                      {/* {fromDate} */} 8-JAN-2020
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "rgba(0, 153, 255, 255)",
                        marginStart: 74,
                        //   marginTop: -1,
                      }}
                    >
                      {/* {toDate} */}12-JAN-2020
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      // alignContent: "flex-end",
                    }}
                  >
                    <Ionicons
                      style={{
                        marginRight: 10,
                        color: "#6F6F6F",
                      }}
                      size={24}
                      name="md-bed"
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#6F6F6F",
                      }}
                    >
                      Room Type
                    </Text>
                    <Ionicons
                      style={{
                        marginRight: 10,
                        marginStart: 50,
                        color: "#6F6F6F",
                      }}
                      size={24}
                      name="md-bed"
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#6F6F6F",
                      }}
                    >
                      No of Rooms
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "rgba(0, 153, 255, 255)",
                        marginStart: 28,
                        //   marginTop: -1,
                      }}
                    >
                      {/* {roomType} */}
                      Luxury
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "rgba(0, 153, 255, 255)",
                        marginStart: 115,
                        //   marginTop: -1,
                      }}
                    >
                      {/* {NoOfRooms} */}2
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  modalToggle: {
    // marginBottom: 10,
    marginTop: 20,
    borderWidth: 1,
    // borderColor: "",
    backgroundColor: "#0099ff",
    color: "white",
    padding: 10,
    borderRadius: 50,
    alignSelf: "center",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    color: "#0099ff",
  },
  text: {
    color: "#52575D",
  },
  image: {
    flex: 1,
    borderRadius: 180,
    height: undefined,
    width: undefined,
  },

  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 200,
    height: 200,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    // alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#0099ff",
    padding: 4,
    height: 8,
    width: 8,
    borderRadius: 6,
    marginTop: 5,
    marginRight: 10,
  },
});

export default HotelModal;
