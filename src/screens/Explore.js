import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { Madoka } from "react-native-textinput-effects";
import StarRating from "react-native-star-rating";
import Slider from "react-native-slider";
import { Accordion } from "native-base";
import { globalStyles } from "../../styles/global";
import { AntDesign } from "@expo/vector-icons";
// import { TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
// import Slider from "@react-native-community/slider";
import Category from "./components/Explore/Category";
import Home from "./components/Explore/Home";
import Tag from "./components/Explore/Tag";
import { Platform } from "@unimodules/core";
// import Agent from "./components/Travel/Agent";
const { height, width } = Dimensions.get("window");
import AwesomeButton from "react-native-really-awesome-button";
import Loader from "./components/layout/Loader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecommendation, test } from "./actions/authActions";

const data = [
  {
    hotel: {
      hotelName: "Pearl Continental",
      hotelImage:
        "https://res.cloudinary.com/al-safar435/image/upload/v1594931430/HotelProfile/jbot0i8y7hrphphjlatc.jpg",
      starRating: 5,
      location: "Islamabad",
    },
    guide: {
      guideName: "Khawaja Ali",
      guideImage:
        "https://res.cloudinary.com/al-safar435/image/upload/v1592678851/TravelGuideImages/wqprs0n2nwvkzv1mdvwn.jpg",
      starRating: 5,
      location: "Islamabad",
    },
  },
  {
    hotel: {
      hotelName: "Marriot",
      hotelImage:
        "https://res.cloudinary.com/al-safar435/image/upload/v1594931431/HotelProfile/rnrzijqmqzqdzxmnr84i.jpg",
      starRating: 5,
      location: "Islamabad",
    },
    guide: {
      guideName: "Tahseen Tauseef",
      guideImage:
        "https://res.cloudinary.com/al-safar435/image/upload/v1592840583/TravelGuideImages/wruplwn7tsw4e1qwkn0w.jpg",
      starRating: 5,
      location: "Islamabad",
    },
  },
];

const Explore = ({ getRecommendation, auth: { recommendations } }) => {
  const [budget, setBudget] = useState(1000);
  const [totalDays, setTotalDays] = useState(1);
  const [needHotel, setneedHotel] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showRecom, setshowRecom] = useState(false);
  const [needGuide, setneedGuide] = useState(false);
  const [city, setCity] = useState("");
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false);

  const changeAccordian = () => {
    if (expanded === true) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };
  useEffect(() => {
    // const scrollY = new Animated.Value(0);
    let startHeaderHeight = 80;
    let endHeaderHeight = 50;

    if (Platform.OS == "android") {
      startHeaderHeight = 100 + StatusBar.currentHeight;
      endHeaderHeight = 70 + StatusBar.currentHeight;
    }

    const animatedHeaderHeight = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [startHeaderHeight, this.endHeaderHeight],
      extrapolate: "clamp",
    });

    const animatedOpacity = animatedHeaderHeight.interpolate({
      inputRange: [endHeaderHeight, startHeaderHeight],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    const animatedTop = animatedHeaderHeight.interpolate({
      inputRange: [endHeaderHeight, startHeaderHeight],
      outputRange: [-30, 10],
      extrapolate: "clamp",
    });
  }, []);

  const submitRecom = async () => {
    let formbody = {
      budget,
      days: totalDays,
      city,
      needHotel,
      needGuide,
    };
    if (
      formbody.city === "" ||
      (formbody.needHotel === false && formbody.needGuide === false)
    ) {
      console.log("false");
    } else {
      setLoading(true);

      getRecommendation(formbody).then(() => {
        setLoading(false);
      });
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <View style={globalStyles.container}>
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
      >
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "700" }}>
              Introducing Al-Safar
            </Text>
            <Text style={{ fontWeight: "100", marginTop: 10 }}>
              A new way to plan your Trips
            </Text>
            <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: "cover",
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#dddddd",
                }}
                source={{
                  uri:
                    "https://image.freepik.com/free-vector/vector-illustration-mountain-landscape_1441-72.jpg",
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                paddingHorizontal: 20,
              }}
            >
              Our Services
            </Text>
            <View style={{ height: 130, marginTop: 20 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Category
                  imageUri={{
                    uri:
                      "https://image.freepik.com/free-vector/hotel-suite-skyscraper-cartoon-vector-interior-illustration_33099-1838.jpg",
                  }}
                  Name="Hotels"
                />
                <Category
                  imageUri={{
                    uri:
                      "https://image.freepik.com/free-vector/relocation-another-city-truck-with-freight_107791-2720.jpg",
                  }}
                  Name="Transport"
                />
                <Category
                  imageUri={{
                    uri:
                      "https://image.freepik.com/free-vector/tour-vacation-guide-illustration_1284-16528.jpg",
                  }}
                  Name="Guide"
                />
                <Category
                  imageUri={{
                    uri:
                      "https://image.freepik.com/free-vector/worker-talking-phone-with-client_52683-13917.jpg",
                  }}
                  Name="Agent"
                />
              </ScrollView>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={() => {
                changeAccordian();
              }}
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={
                  expanded
                    ? {
                        fontSize: 24,
                        fontWeight: "700",
                        paddingHorizontal: 20,
                      }
                    : {
                        fontSize: 24,
                        fontWeight: "700",
                        paddingHorizontal: 20,
                        color: "#0099ff",
                      }
                }
              >
                Let Us Help You Out!
              </Text>
              {expanded ? (
                <AntDesign
                  style={{
                    paddingHorizontal: 20,
                  }}
                  name="caretdown"
                  size={24}
                  color="#000"
                />
              ) : (
                <AntDesign
                  style={{
                    paddingHorizontal: 20,
                  }}
                  name="caretdown"
                  size={24}
                  color="#0099ff"
                />
              )}
            </TouchableOpacity>
            {expanded && (
              <View>
                <View
                  style={{
                    marginTop: 20,
                    marginHorizontal: 20,
                    alignContent: "center",
                  }}
                >
                  <Madoka
                    label={"City"}
                    // this is used as active and passive border color
                    borderColor={"#000"}
                    inputPadding={16}
                    labelHeight={24}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                    labelStyle={{ color: "#000" }}
                    inputStyle={{ color: "#0099ff" }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 20,
                    marginHorizontal: 20,
                    alignContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    Share your Budget with us.
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.value} numberOfLines={1}>
                      <Text style={{ fontWeight: "500" }}>Budget: </Text>
                      Rs.{budget}
                    </Text>
                  </View>
                  <Slider
                    minimumTrackTintColor="#0099ff"
                    minimumValue={1000}
                    maximumValue={100000}
                    step={500}
                    value={budget}
                    onValueChange={(value) => setBudget(value)}
                    thumbImage={require("../../assets/dollar.png")}
                    thumbStyle={styles.thumb}
                    thumbTintColor="#F3CC2F"
                  />
                </View>
                <View
                  style={{
                    marginTop: 20,
                    marginHorizontal: 20,
                    alignContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    How long will your trip be ?
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.value} numberOfLines={1}>
                      <Text style={{ fontWeight: "500" }}>Days: </Text>
                      {totalDays}
                    </Text>
                  </View>
                  <Slider
                    minimumValue={1}
                    maximumValue={15}
                    step={1}
                    value={totalDays}
                    onValueChange={(value) => setTotalDays(value)}
                    minimumTrackTintColor="#0099ff"
                    maximumTrackTintColor="#d3d3d3"
                    thumbTintColor="#0099ff"
                  />
                </View>
                <View
                  style={{
                    marginTop: 20,
                    marginHorizontal: 20,
                    alignContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      marginBottom: 10,
                    }}
                  >
                    Choose the Services you need.
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={needHotel ? styles.buttonPress : styles.button}
                      onPress={() => {
                        if (needHotel === false) {
                          setneedHotel(true);
                        } else {
                          setneedHotel(false);
                        }
                      }}
                    >
                      <Text
                        style={needHotel ? styles.welcomePress : styles.welcome}
                      >
                        Hotel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={needGuide ? styles.buttonPress : styles.button}
                      onPress={() => {
                        if (needGuide === false) {
                          setneedGuide(true);
                        } else {
                          setneedGuide(false);
                        }
                      }}
                    >
                      <Text
                        style={needGuide ? styles.welcomePress : styles.welcome}
                      >
                        Guide
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 20,
                    marginHorizontal: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AwesomeButton
                    raiseLevel={4}
                    backgroundColor="#FFF"
                    textColor="#0099ff"
                    backgroundDarker="#1073CE"
                    borderColor="#1073CE"
                    borderWidth={2}
                    borderRadius={50}
                    width={width - 100}
                    textSize={24}
                    onPress={(next) => {
                      // setModalOpen(true);
                      submitRecom(true);
                      /** Do Something **/
                      next();
                    }}
                  >
                    Get My Package
                  </AwesomeButton>
                </View>
                {recommendations &&
                  (recommendations.hotel || recommendations.guide) && (
                    <View style={{ flexDirection: "column" }}>
                      <View
                        style={{
                          borderWidth: 2,
                          borderRadius: 10,
                          marginVertical: 20,
                          borderColor: "rgba(0, 153, 255,0.3)",
                          marginHorizontal: 10,
                          padding: 10,
                        }}
                      >
                        <Text
                          style={{
                            marginTop: 10,
                            textAlign: "center",
                            fontSize: 24,
                            fontWeight: "500",
                          }}
                        >
                          Package
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            // alignContent: "space-between",
                            marginTop: 10,
                          }}
                        >
                          {needHotel && recommendations.hotel && (
                            <TouchableOpacity style={styles.recomCard}>
                              <Image
                                source={{
                                  uri: recommendations.hotel.hotelImages[0],
                                }}
                                resizeMode="contain"
                                style={{
                                  width: width / 2 - 50,
                                  height: 100,
                                  borderRadius: 10,
                                }}
                              />
                              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                                {recommendations.hotel.hotelName}
                              </Text>
                              <Text style={{ fontSize: 12, fontWeight: "500" }}>
                                {recommendations.hotel.city}
                              </Text>
                              {recommendations.hotel.starRating > 0 ? (
                                <StarRating
                                  style={{ marginTop: 10 }}
                                  disable
                                  maxStars={5}
                                  rating={recommendations.hotel.starRating}
                                  starSize={15}
                                />
                              ) : (
                                <StarRating
                                  style={{ marginTop: 10 }}
                                  disable
                                  maxStars={5}
                                  rating={3}
                                  starSize={15}
                                />
                              )}
                            </TouchableOpacity>
                          )}
                          {needGuide && recommendations.guide && (
                            <TouchableOpacity style={styles.recomCard}>
                              <Image
                                source={{
                                  uri: recommendations.guide.Image,
                                }}
                                resizeMode="contain"
                                style={{
                                  width: width / 2 - 50,
                                  height: 100,
                                  borderRadius: 10,
                                }}
                              />
                              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                                {recommendations.guide.name}
                              </Text>
                              <Text style={{ fontSize: 12, fontWeight: "500" }}>
                                {recommendations.guide.UserProfile[0].city}
                              </Text>
                              {recommendations.guide.starRating > 0 ? (
                                <StarRating
                                  style={{ marginTop: 10 }}
                                  disable
                                  maxStars={5}
                                  rating={recommendations.guide.starRating}
                                  starSize={15}
                                />
                              ) : (
                                <StarRating
                                  style={{ marginTop: 10 }}
                                  disable
                                  maxStars={5}
                                  rating={3}
                                  starSize={15}
                                />
                              )}
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>
                  )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

var styles = StyleSheet.create({
  value: {
    flex: 1,
    textAlign: "right",
    marginLeft: 10,
    fontSize: 12,
  },
  thumb: {
    width: 32,
    height: 32,
    // color: "#0099ff",
    shadowColor: "black",
    borderRadius: 100,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#0099ff",
  },
  welcomePress: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
  button: {
    borderColor: "#0099ff",
    width: width / 3,
    borderWidth: 1,
    borderRadius: 10,
    // marginHorizontal: 20,
  },
  buttonPress: {
    width: width / 3,
    borderColor: "#0099ff",
    // marginHorizontal: 20,
    backgroundColor: "#0099ff",
    borderWidth: 1,
    borderRadius: 10,
  },
  recomCard: {
    // flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    paddingVertical: 15,
    height: 200,
    backgroundColor: "#f5f5f5",
    width: width / 2 - 30,
    borderRadius: 25,
    borderWidth: null,
    // justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 6,
  },
});
Explore.propTypes = {
  auth: PropTypes.object.isRequired,
  getRecommendation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getRecommendation })(Explore);

// export default Explore;
