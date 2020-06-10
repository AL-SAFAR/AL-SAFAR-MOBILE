import React, { useState } from "react";
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
import { globalStyles } from "../../../../styles/global";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BookingForm from "./BookingForm";
const { width, height } = Dimensions.get("window");
const HotelProfile = ({ navigation }) => {
  // console.log(hotel);
  const hotel = navigation.getParam("hotel");
  const {
    hotelName,
    address,
    description,
    hotelImages,
    starRating,
    extras,
    houseRules,
  } = hotel;

  const { foods, facilities, wifi, parking } = extras;
  const { checkIn, checkOut, Smoking } = houseRules;
  const { Activities } = facilities;
  const [modalOpen, setModalOpen] = useState(false);
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
    <SafeAreaView style={{ ...styles.container, ...globalStyles.container }}>
      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.modalContent}>
          <MaterialIcons
            name="close"
            size={24}
            style={styles.modalToggle}
            onPress={() => setModalOpen(false)}
          />
          <BookingForm setModalOpen={setModalOpen} />
        </View>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyles.titleBar}>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeNavigation")}
          >
            <Ionicons
              name="ios-arrow-back"
              size={24}
              color="#52575D"
            ></Ionicons>
          </TouchableOpacity>
          <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
        </View>
        {/* Images slider */}
        <View style={{ marginTop: 10 }}>
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
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {hotelName}
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
              {address}
            </Text>
          </View>
          {/* wifi,smoking,parking */}
          <View style={styles.statsContainer}>
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
          {/* Description */}
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
              <Text style={{ flexWrap: "wrap" }}>{description}</Text>
            </ReadMore>
          </View>
          <View style={{ flexDirection: "row" }}>
            {/* Foods */}
            <View
              style={{
                ...styles.infoContainer,
                width: width / 2,
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
                    {foods.map((food, key) => {
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
                    })}
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
                Activities
              </Text>
              <View style={{ alignItems: "center" }}>
                <View style={styles.recentItem}>
                  <View style={{ flexDirection: "column", marginTop: 5 }}>
                    {Activities.map((activity, key) => {
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
                    })}
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
                {checkIn}
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
                {checkOut}
              </Text>
              <Text style={[styles.text, styles.subText]}>CheckOut</Text>
            </View>
          </View>
          {/* book now button */}
          <TouchableOpacity
            onPress={() => setModalOpen(true)}
            style={{
              ...styles.statsContainer,
              marginVertical: 10,
              marginHorizontal: 10,
              borderRadius: 10,
              borderWidth: 1,
              padding: 5,
              backgroundColor: "#0099ff",
            }}
          >
            <View style={styles.statsBox}>
              <Text style={{ color: "white", fontWeight: "200", fontSize: 26 }}>
                BOOK NOW
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default HotelProfile;
