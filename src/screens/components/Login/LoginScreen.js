import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  View,
  Animated
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Animatable from "react-native-animatable";

const ScreenHeight = Dimensions.get("window").height;

export class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    this.loginHeight = new Animated.Value(150);
  }
  increaseHeightOfLogin = () => {
    Animated.timing(this.loginHeight, {
      toValue: ScreenHeight,
      duration: 500
    }).start();
  };
  decreaseHeightOfLogin = () => {
    Animated.timing(this.loginHeight, {
      toValue: i50,
      duration: 500
    }).start();
  };

  render() {
    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, ScreenHeight],
      outputRange: [1, 0]
    });
    const headerBackArrowOpacity = this.loginHeight.interpolate({
      inputRange: [150, ScreenHeight],
      outputRange: [0, 1]
    });

    const marginTop = this.loginHeight.interpolate({
      inputRange: [150, ScreenHeight],
      outputRange: [1, 0]
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            postion: "absolute",
            height: 60,
            width: 60,
            top: 60,
            left: 25,
            zIndex: 100,
            opacity: headerBackArrowOpacity
          }}
        >
          <TouchableOpacity onPress={() => this.decreaseHeightOfLogin()}>
            <Ionicons name="md-arrow-back" color="black" />
          </TouchableOpacity>
        </Animated.View>

        <ImageBackground
          source={require("../../../../assets/patterns/bg.jpg")}
          style={{ flex: 1 }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Animatable.View
              animation="zoomIn"
              iterationCount={1}
              style={{
                backgroundColor: "white",
                height: 150,
                width: 150,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontFamily: "sans-serif-thin",
                  fontWeight: "bold",
                  fontSize: 28
                }}
              >
                AL SAFAR
              </Text>
            </Animatable.View>
          </View>

          {/* {bootom half} */}

          <Animatable.View animation="slideInUp" iterationCount={1}>
            <Animated.View
              style={{ height: this.loginHeight, backgroundColor: "white" }}
            >
              <Animated.View
                style={{
                  alignItems: "flex-start",
                  paddingHorizontal: 25,
                  marginTop: marginTop, //animated
                  opacity: headerTextOpacity //animated
                }}
              >
                <Text style={{ fontSize: 24 }}>Let's Travel the World</Text>
              </Animated.View>
              <TouchableOpacity onPress={() => this.increaseHeightOfLogin()}>
                <View
                  style={{
                    marginTop: 25, //animated
                    paddingHorizontal: 25,
                    flexDirection: "row"
                  }}
                >
                  <Image
                    source={require("../../../../assets/patterns/pakistan.png")}
                    style={{
                      height: 32,
                      width: 32,
                      resizeMode: "contain"
                    }}
                  />
                  <View
                    pointerEvents="none"
                    style={{ flexDirection: "row", flex: 1 }}
                  >
                    <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>
                      +92
                    </Text>
                    <TextInput
                      style={{ flex: 1, fontSize: 20 }}
                      placeholder="Enter your Mobile Number"
                      underlineColorAndroid="transparent"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>

            <View
              style={{
                height: 70,
                backgroundColor: "white",
                alignItems: "flex-start",
                justifyContent: "center",
                borderTopColor: "#e8e8e8",
                borderWidth: 1,
                paddingHorizontal: 25
              }}
            >
              <Text
                style={{
                  color: "#5a7fdf",
                  fontWeight: "bold"
                }}
              >
                Connect
              </Text>
            </View>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

export default LoginScreen;
