import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import Slider from "react-native-slider";
import { globalStyles } from "../../styles/global";
import {
  Ionicons as Icons,
  FontAwesome as FIcons,
  Feather as FeatherIcon,
} from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
// import Slider from "@react-native-community/slider";
import Category from "./components/Explore/Category";
import Home from "./components/Explore/Home";
import Tag from "./components/Explore/Tag";
import { Platform } from "@unimodules/core";
// import Agent from "./components/Travel/Agent";

const { height, width } = Dimensions.get("window");

export default class Explore extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }
  componentWillMount() {
    this.scrollY = new Animated.Value(0);
    this.startHeaderHeight = 80;
    this.endHeaderHeight = 50;

    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
      this.endHeaderHeight = 70 + StatusBar.currentHeight;
    }

    this.animatedHeaderHeight = this.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [this.startHeaderHeight, this.endHeaderHeight],
      extrapolate: "clamp",
    });

    this.animatedOpacity = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    this.animatedTop = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [-30, 10],
      extrapolate: "clamp",
    });
  }

  render() {
    return (
      <View style={globalStyles.container}>
        {/* <Animated.View
          style={{
            height: this.animatedHeaderHeight,
            backgroundColor: "white",
            borderBottomWidth: 1,
            borderBottomColor: "#dddddd",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // alignItems: "stretch",
              paddingHorizontal: 10,
              paddingBottom: 10,
              // paddingTop: 0,
              backgroundColor: "white",
              marginHorizontal: 20,
              shadowOffset: { width: 0, height: 0 },
              shadowColor: "black",
              shadowOpacity: 0.2,
              elevation: 4,
              // marginTop: 30
            }}
          >
            <Icons
              name="ios-search"
              size={25}
              style={{ marginRight: 10, alignSelf: "center" }}
            />
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Try Islamabad"
              placeholderTextColor="grey"
              style={{
                flex: 1,
                fontWeight: "700",
                backgroundColor: "white",
                alignSelf: "center",
              }}
            />
          </View>
          <Animated.View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              position: "relative",
              top: this.animatedTop,
              opacity: this.animatedOpacity,
            }}
          >
            <Tag name="Guests" />
            <Tag name="Dates" />
          </Animated.View>
        </Animated.View> */}
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.scrollY } } },
          ])}
        >
          <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: "700" }}>
                Introducing Al-Safar
              </Text>
              <Text style={{ fontWeight: "100", marginTop: 10 }}>
                A new selection of homes verified for quality & comfort
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
                  source={require("../../assets/home.jpg")}
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
                        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
                    }}
                    Name="Hotels"
                  />
                  <Category
                    imageUri={{
                      uri:
                        "https://images.unsplash.com/46/sh3y2u5PSaKq8c4LxB3B_submission-photo-4.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=755&q=80",
                    }}
                    Name="Motels"
                  />
                  <Category
                    imageUri={require("../../assets/restaurant.jpg")}
                    Name="Restaurant"
                  />
                  <Category
                    imageUri={{
                      uri:
                        "https://images.unsplash.com/photo-1504971737233-9a29c29c17cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
                    }}
                    Name="Pick n Drop"
                  />
                </ScrollView>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  paddingHorizontal: 20,
                }}
              >
                Let Us Help You Out!
              </Text>
              {/* <View style={{ justifyContent: "center", alignItems: "center" }}> */}
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
                    Rs.{this.state.value}
                  </Text>
                </View>
                <Slider
                  minimumTrackTintColor="#13a9d6"
                  minimumValue={1000}
                  maximumValue={100000}
                  step={500}
                  value={this.state.value}
                  onValueChange={(value) => this.setState({ value })}
                  thumbImage={require("../../assets/dollar.png")}
                  thumbStyle={styles.thumb}
                  thumbTintColor="#F3CC2F"
                />
              </View>
              {/* </View> */}
              {/* <Agent
                placeUri={{
                  uri:
                    "https://images.unsplash.com/photo-1561486008-1011a284acfb?ixlib=rb-1.2.1&auto=format&fit=crop&w=747&q=80"
                }}
                placePrice={90}
                agentPic={{
                  uri: "https://uinames.com/api/photos/female/2.jpg"
                }}
                placeName={"Buckingham Palace"}
                placeDescription={"Entire Palace • 27 reviews • London"}
              />
              <Agent
                placeUri={{
                  uri:
                    "https://images.unsplash.com/photo-1561486008-1011a284acfb?ixlib=rb-1.2.1&auto=format&fit=crop&w=747&q=80"
                }}
                placePrice={90}
                agentPic={{
                  uri: "https://uinames.com/api/photos/female/2.jpg"
                }}
                placeName={"Buckingham Palace"}
                placeDescription={"Entire Palace • 27 reviews • London"}
              /> */}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

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
    shadowColor: "black",
    borderRadius: 100,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
});
